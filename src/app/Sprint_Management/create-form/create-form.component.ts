import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sprintApiService } from '../services/sprintApi.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { ToastrService } from 'ngx-toastr';

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

    constructor(
        private router: Router,
        private sprintApiService: sprintApiService,
        private route: ActivatedRoute,
        private sharedService: SharedService,
        private resourceAllocationService: ResourceAllocationService,
        private toastr: ToastrService) { }

    ngOnInit(): void {
        // Subscribe to the data from the shared service
        this.sharedService.data$.subscribe(data => {
            // Handle the received data
            console.log('Received data:', data);
        });
    }
    
    headArray = ['Resource_ID', 'Team', 'Job_Role', 'Org_Unit', 'Availability'];
    resources = [];

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
                // Handle success
                this.toastr.success('Sprint created successfully!', 'Success');
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

                            // Process unique data
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
                                        console.log('Resource allocation created successfully:', response);
                                        this.toastr.success('Resource allocation created successfully!', 'Success');
                                    },
                                    (error) => {
                                        console.error('Error creating resource allocation:', error);
                                        this.toastr.error('Error creating resource allocation.', 'Error');
                                    }
                                );
                            });
                        });
                        this.router.navigate(['/pages-body/sprint-management/createform']);
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
}
