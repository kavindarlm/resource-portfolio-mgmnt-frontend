import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { sprintApiService } from '../services/sprintApi.service';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { DeleteSprintPopupComponent } from '../Reusable_Components/delete-sprint-popup/delete-sprint-popup.component';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-sprint-mgt',
  templateUrl: './sprint-mgt.component.html',
  styleUrls: ['./sprint-mgt.component.css']
})
export class SprintMgtComponent implements OnInit {
  @ViewChild(DeleteSprintPopupComponent) deletePopup!: DeleteSprintPopupComponent;

  sprint_id: string = '';
  sprintName: string = '';
  startDate: string = '';
  endDate: string = '';

  HeadArray = ['Resource_ID', 'Team', 'Job_Role', 'Org_Unit', 'Availability'];
  ResourcesOfSprint: any[] = [];
  clickedResourceId: string | null = null;

  showPopup: boolean = false;

  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 5; // Number of items per page

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sprintApiService: sprintApiService,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService,
    private toastr: ToastrService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprint_id = params['id'];
      this.fetchSprintData();
    });
  }

  fetchSprintData(): void {
    // Clear the resources list before fetching new sprint data
    this.ResourcesOfSprint = [];

    this.sprintApiService.findOneById(parseInt(this.sprint_id)).subscribe(
      (sprint: any) => {
        this.sprintName = sprint.sprint_name;
        this.startDate = sprint.start_Date;
        this.endDate = sprint.end_Date;
        this.fetchAndPopulateResourcesOfSprint();
      },
      error => {
        console.error('Error fetching sprint data:', error);
      }
    );
  }

  fetchAndPopulateResourcesOfSprint(): void {
    this.resourceAllocationService.getResourceAllocationBySprintId(parseInt(this.sprint_id))
      .pipe(
        mergeMap((data: any[]) => {
          const resourceIds = data.map(allocation => allocation.resource.resourceId);
          const resourceObservables: Observable<any>[] = resourceIds.map(resourceId => this.resourceService.findOneResource(resourceId));
          return forkJoin(resourceObservables);
        }),
        mergeMap((resources: any[]) => {
          const uniqueResources = new Map<number, any>(); // Map to store unique resources by resourceId
          resources.forEach(resource => {
            if (!uniqueResources.has(resource.resourceId)) {
              uniqueResources.set(resource.resourceId, {
                Resource_ID: resource.resourceId,
                Team: resource.job_role ? resource.job_role.team_name : 'N/A',
                Job_Role: resource.job_role ? resource.job_role.roleName : 'N/A',
                Org_Unit: resource.org_unit ? resource.org_unit.unitName : 'N/A',
                Availability: '' // Placeholder for availability
              });
            }
          });

          // Fetch tasks for each resource to calculate availability
          const availabilityObservables = Array.from(uniqueResources.values()).map(resource =>
            this.resourceAllocationService.getTasksByResourceId(resource.Resource_ID).pipe(
              map(tasks => {
                const filteredTasks = tasks.filter(task => task.resourceAllocation.task.taskProgressPercentage < 100);
                const totalAllocation = filteredTasks.reduce((total, task) => {
                  const allocationPercentage = task.resourceAllocation.percentage || 0; // Assuming the field name is 'percentage'
                  return total + allocationPercentage;
                }, 0);
                const availabilityPercentage = totalAllocation + '%';
                return {
                  ...resource,
                  Availability: availabilityPercentage
                };
              })
            )
          );
          return forkJoin(availabilityObservables);
        })
      )
      .subscribe(
        (resourcesOfSprint: any[]) => {
          this.ResourcesOfSprint = resourcesOfSprint;
          console.log('ResourcesOfSprint:', this.ResourcesOfSprint);
        },
        error => {
          console.error('Error fetching and populating ResourcesOfSprint:', error);
        }
      );
  }

  onRowClick(resourceId: string): void {
    this.clickedResourceId = resourceId;
    const resource = this.ResourcesOfSprint.find(res => res.Resource_ID === resourceId);

    if (resource) {
      const availability = resource.Availability;
      this.router.navigate([`allocated-resource/${this.sprint_id}/${resourceId}`], {
        relativeTo: this.route,
        queryParams: { availability: availability }
      });
    }
  }

  openDeletePopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  deleteSprint(): void {
    const sprintId = parseInt(this.sprint_id);

    this.resourceAllocationService.deleteResourceAllocationsBySprintId(sprintId).pipe(
      mergeMap(() => this.sprintApiService.deleteSprint(sprintId)),
      catchError(error => {
        this.toastr.error('Error deleting sprint and resource allocations. Please try again.', 'Error');
        return of(undefined); // Return undefined or a suitable fallback value in case of an error
      })
    ).subscribe(() => {
      this.toastr.success('Sprint and associated resource allocations deleted successfully', 'Success');
      this.closePopup(); // Hide the popup
      this.sharedService.notifySprintDeleted(); // Notify about the deletion
    });
  }

  deleteContent() {
    this.router.navigate(['/pages-body/sprint-management']);
  }

  // Pagination methods
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    // You may fetch data for the new page here or adjust your existing data array
    // For simplicity, assuming your data is already in ResourcesOfSprint and just need to slice it
  }

  get paginatedResources(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.ResourcesOfSprint.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.ResourcesOfSprint.length / this.pageSize);
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
