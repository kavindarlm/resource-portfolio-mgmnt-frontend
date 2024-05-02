import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, mergeMap, map } from 'rxjs';
import { sprintApiService } from '../services/sprintApi.service';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';

@Component({
  selector: 'app-sprint-mgt',
  templateUrl: './sprint-mgt.component.html',
  styleUrls: ['./sprint-mgt.component.css']
})
export class SprintMgtComponent implements OnInit {
  // Parameters to hold sprint data
  sprint_id: string = '';
  sprintName: string = '';
  startDate: string = '';
  endDate: string = '';

  // Define the headers and resource data array
  HeadArray = ['Resource_ID', 'Team', 'Job_Role', 'Org_Unit', 'Availability'];
  ResourcesOfSprint: any[] = [];

  clickedResourceId: string | null = null;

  // Constructor injection
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sprintApiService: sprintApiService,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameters
    this.route.params.subscribe(params => {
      this.sprint_id = params['id']; // Retrieve sprint ID from route parameter

      // Fetch sprint data
      this.sprintApiService.findOneById(parseInt(this.sprint_id)).subscribe(
        (sprint: any) => {
          // Assign sprint data to component properties
          this.sprintName = sprint.sprint_name;
          this.startDate = sprint.start_Date;
          this.endDate = sprint.end_Date;

          // Fetch resource allocation data and populate ResourcesOfSprint
          this.fetchAndPopulateResourcesOfSprint();
        },
        (error: any) => {
          // Handle error
          console.error('Error fetching sprint data:', error);
        }
      );
    });
  }

  // Fetch and populate the ResourcesOfSprint array
  fetchAndPopulateResourcesOfSprint(): void {
    this.resourceAllocationService.getResourceAllocationBySprintId(parseInt(this.sprint_id))
      .pipe(
        // Extract resource IDs and fetch resources data
        mergeMap((data: any[]) => {
          const resourceIds = data.map(allocation => allocation.resource.resourceId);
          const resourceObservables: Observable<any>[] = resourceIds.map(resourceId => this.resourceService.findOneResource(resourceId));
          return forkJoin(resourceObservables);
        }),
        // Map over fetched resources to extract the desired properties
        map((resources: any[]) => {
          return resources.map(resource => ({
            Resource_ID: resource.resourceId,
            Team: resource.job_role.team_name,
            Job_Role: resource.job_role.roleName,
            Org_Unit: resource.org_unit.unitName,
            Availability: 'y'
          }));
        })
      )
      .subscribe(
        (resourcesOfSprint: any[]) => {
          // Assign the fetched and transformed data to ResourcesOfSprint
          this.ResourcesOfSprint = resourcesOfSprint;
          console.log('ResourcesOfSprint:', this.ResourcesOfSprint);
        },
        error => {
          console.error('Error fetching and populating ResourcesOfSprint:', error);
        }
      );
  }

  // Function to handle row click events and assign the clicked resource ID
  onRowClick(resourceId: string): void {
    // Save the clicked resource ID
    this.clickedResourceId = resourceId;

    // Navigate to the child route using the clicked resource ID
    this.router.navigate([`allocated-resource/${this.sprint_id}/${resourceId}`], { relativeTo: this.route });
  }
}
