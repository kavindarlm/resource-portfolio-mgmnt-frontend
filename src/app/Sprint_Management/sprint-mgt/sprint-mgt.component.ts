// sprint-mgt.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { sprintApiService } from '../services/sprintApi.service';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { DeleteSprintPopupComponent } from '../Reusable_Components/delete-sprint-popup/delete-sprint-popup.component';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sprintApiService: sprintApiService,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService,
    private toastr: ToastrService
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
            map((resources: any[]) => {
                const uniqueResources = new Map<number, any>(); // Map to store unique resources by resourceId
                resources.forEach(resource => {
                    if (!uniqueResources.has(resource.resourceId)) {
                        uniqueResources.set(resource.resourceId, {
                            Resource_ID: resource.resourceId,
                            Team: resource.job_role ? resource.job_role.team_name : 'N/A',
                            Job_Role: resource.job_role ? resource.job_role.roleName : 'N/A',
                            Org_Unit: resource.org_unit ? resource.org_unit.unitName : 'N/A',
                            Availability: 'y'
                        });
                    }
                });
                return Array.from(uniqueResources.values());
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
    this.router.navigate([`allocated-resource/${this.sprint_id}/${resourceId}`], { relativeTo: this.route });
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
    });
  }

  deleteContent() {
    this.router.navigate(['/pages-body/sprint-management']);
  }

}
