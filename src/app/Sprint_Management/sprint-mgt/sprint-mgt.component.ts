import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
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
  resourcesData: any[] = [];
  ResourceAllocationData: any[] = [];
  resourceIds: string[] = [];

  // Constructor injection
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sprintApiService: sprintApiService,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService
  ) {}

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

                // Fetch resource allocation data
                this.fetchResourceAllocationData();
            },
            (error: any) => {
                // Handle error
                console.error('Error fetching sprint data:', error);
            }
        );
    });
  }

  // Fetch resource allocation data
  fetchResourceAllocationData(): void {
    this.resourceAllocationService.getResourceAllocationBySprintId(parseInt(this.sprint_id)).subscribe(
        (data: any[]) => {
            // Store the fetched data
            this.ResourceAllocationData = data;
            console.log('Resource Allocation Data:', this.ResourceAllocationData);
            
            // Extract resource IDs from the fetched data
            const resourceIds = data.map(allocation => allocation.resource.resourceId);
            
            // Fetch resources by IDs
            this.fetchResourcesByIds(resourceIds);
        },
        error => {
            console.error('Error fetching resource allocation data:', error);
        }
    );
  }

  // Fetch resource data for given resource IDs
  fetchResourcesByIds(resourceIds: string[]): void {
    // Map over resource IDs and call findOneResource for each ID
    const resourceObservables: Observable<any>[] = resourceIds.map(resourceId => this.resourceService.findOneResource(resourceId));
    
    // Use forkJoin to combine all observables and wait for all to complete
    forkJoin(resourceObservables).subscribe(
        (resources: any[]) => {
            // Store the fetched resources in a separate array
            this.resourcesData = resources;
            console.log('Fetched Resources Data:', this.resourcesData);
            
            // Populate the ResourcesOfSprint array
            this.populateResourcesOfSprint();
        },
        error => {
            console.error('Error fetching resources data:', error);
        }
    );
  }

  // Function to map a resource object to the desired format
  mapResourceToDesiredFormat(resource: any): any {
      return {
        Resource_ID: resource.resourceId,
        Team: resource.job_role.team_name,
        Job_Role: resource.job_role.roleName,
        Org_Unit: resource.org_unit.unitName,
        Availability: 'y'
      };
  }

  // Populate the ResourcesOfSprint array
  populateResourcesOfSprint(): void {
      // Map over resourcesData to extract the desired properties
      this.ResourcesOfSprint = this.resourcesData.map(resource => this.mapResourceToDesiredFormat(resource));
      console.log('ResourcesOfSprint:', this.ResourcesOfSprint);
  }
}
