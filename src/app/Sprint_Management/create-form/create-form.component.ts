import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sprintApiService } from '../services/sprintApi.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map } from 'rxjs';

interface ProjectTaskData {
  resourceId: string;
  taskId: string;
  percentage: number | null;
}

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  sprintName: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  processedDataIds: Set<string> = new Set();

  headArray = ['Resource_ID', 'Team', 'Job_Role', 'Org_Unit', 'Availability'];
  tablecontents: any[] = [];
  sharedData: ProjectTaskData[] = [];

  constructor(
    private router: Router,
    private sprintApiService: sprintApiService,
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private sharedService: SharedService,
    private resourceAllocationService: ResourceAllocationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // Subscribe to the data from the shared service
    this.sharedService.data$.subscribe(data => {
      // Handle the received data
      console.log('Received data:', data);
      this.sharedData = data;
      this.fetchResources();
    });
    this.fetchResources();
  }

  getSprintFormData(data: any) {
    const today = new Date();

    // Check if sprint name is provided
    if (!this.sprintName.trim()) {
      this.toastr.error('You haven\'t given a sprint name. Please try again.', 'Sprint Name Error');
      return;
    }

    // Validate start and end dates
    if (new Date(this.startDate) < today) {
      this.toastr.error('Start date cannot be earlier than today. Please try again.', 'Date Error');
      return;
    }

    if (new Date(this.endDate) < new Date(this.startDate)) {
      this.toastr.error('End date cannot be earlier than start date. Please try again.', 'Date Error');
      return;
    }

    // Prepare sprint data
    const sprintData = {
      sprint_name: this.sprintName,
      start_Date: this.startDate,
      end_Date: this.endDate,
    };

    // Call the sprintApiService to create a new sprint
    this.sprintApiService.createSprint(sprintData).subscribe(
      (response) => {
        // Reset form
        this.sprintName = '';
        this.startDate = new Date();
        this.endDate = new Date();

        // After creating the sprint, find the sprint ID using the sprint name
        this.sprintApiService.findOneByName(sprintData.sprint_name).subscribe(
          (sprint) => {
            const sprintId = sprint.sprint_id; // Get the sprint ID

            // Get the resource allocation data from the shared service
            this.sharedService.data$.subscribe(resourceAllocations => {
              // Filter out data that has already been processed
              const uniqueAllocations = resourceAllocations.filter(allocation => {
                const uniqueKey = `${allocation.resourceId}-${allocation.taskId}`;
                if (this.processedDataIds.has(uniqueKey)) {
                  return false; // Data has already been processed
                } else {
                  this.processedDataIds.add(uniqueKey); // Mark data as processed
                  return true;
                }
              });

              // Counter to track the number of completed resource allocation requests
              let allocationCounter = 0;

              if (uniqueAllocations.length === 0) {
                // If no allocations to process, show success message and navigate
                this.toastr.success('Sprint created successfully!', 'Success');
                this.router.navigate(['/pages-body/sprint-management/createform']);
                this.sharedService.notifySprintCreated();
              } else {
                uniqueAllocations.forEach(allocation => {
                  // Create the resource allocation data object
                  const resourceAllocation = {
                    sprint_id: sprintId,
                    resource_id: allocation.resourceId,
                    task_id: allocation.taskId,
                    percentage: allocation.percentage,
                  };

                  // Send the resource allocation data to the resource allocation API service
                  this.resourceAllocationService.createResourceAllocation(resourceAllocation).subscribe(
                    (response) => {
                      allocationCounter++;
                      if (allocationCounter === uniqueAllocations.length) {
                        // Show success message and navigate only after all allocations are processed
                        this.toastr.success('Sprint created successfully!', 'Success');
                        this.router.navigate(['/pages-body/sprint-management/createform']);
                        this.sharedService.notifySprintCreated();
                      }
                    },
                    (error) => {
                      console.error('Error creating resource allocation:', error);
                      this.toastr.error('Error creating resource allocation.', 'Error');
                    }
                  );
                });
              }
            });

            // Clear the resources array
            this.clearResources();
          },
          (error) => {
            console.error('Error fetching sprint ID:', error);
            this.toastr.error('Error fetching sprint ID.', 'Error');
          }
        );
      },
      (error) => {
        console.error('Error creating sprint:', error);
        this.toastr.error('Failed to create sprint. Please try again.', 'Error');
      }
    );
  }

  // Method to clear the resources array
  clearResources(): void {
    this.tablecontents = [];
  }

  fetchResources(): void {
    this.resourceService.getResourcesForSprint().subscribe(
      (data: any[]) => {
        this.tablecontents = data.filter(resource =>
          this.sharedData.some(shared => shared.resourceId === resource.resource_id)
        ).map(resource => ({
          Resource_ID: resource.resource_id,
          Team: resource.team_name,
          Job_Role: resource.role_name,
          Org_Unit: resource.org_unit_name,
          Availability: '' // Placeholder for availability
        }));
        this.calculateAvailability();
      },
      error => {
        console.error('Error fetching resources:', error);
      }
    );
  }

  calculateAvailability(): void {
    const availabilityObservables = this.tablecontents.map(resource =>
      this.resourceAllocationService.getTasksByResourceId(resource.Resource_ID).pipe(
        map(tasks => {
          const filteredTasks = tasks.filter(task => task.resourceAllocation.task.taskProgressPercentage < 100);
          const totalAllocation = filteredTasks.reduce((total, task) => {
            const allocationPercentage = task.resourceAllocation.percentage || 0;
            return total + allocationPercentage;
          }, 0);

          const availabilityPercentage = totalAllocation;

          return {
            ...resource,
            Availability: availabilityPercentage
          };
        })
      )
    );

    // Use forkJoin to wait for all observables to complete
    forkJoin(availabilityObservables).subscribe(
      updatedResources => {
        this.tablecontents = updatedResources;
      },
      error => {
        console.error('Error calculating availability:', error);
      }
    );
  }
}
