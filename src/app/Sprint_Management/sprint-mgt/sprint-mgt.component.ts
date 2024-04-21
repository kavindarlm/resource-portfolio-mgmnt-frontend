import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintManagementService } from '../../services/sprint-management.service';
import { ResourceAllocationService } from '../../services/resource_allocation.service';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-sprint-mgt',
  templateUrl: './sprint-mgt.component.html',
  styleUrl: './sprint-mgt.component.css'
})
export class SprintMgtComponent implements OnInit {

  CloseTab() {

  }

  hArray = ['Resource_ID', 'Team', 'Job_Role', 'Org_Unit', 'Availability'];

  resources: any[] = [];
  resourceIds: number[] = [];

  sprintName: string = '';
  startDate: string = '';
  endDate: string = '';


  constructor(
    private route: ActivatedRoute,
    private sprintService: SprintManagementService,
    private router: Router,
    private resourceAllocationService: ResourceAllocationService,
    private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintName = params['Sname'];
      this.getSprintDetails(this.sprintName);
    });
  }


  getSprintDetails(sprintName: string): void {
    // Clear the resources array each time the sprint name changes
    this.resources = [];

    this.sprintService.getSprintDetailsByName(sprintName).subscribe(
      (data: any) => {
        this.startDate = data.Start_Date;
        this.endDate = data.End_Date;
        const sprintId = data.id;

        // Fetch resource IDs for the sprint ID
        this.resourceAllocationService.getResourceIdsBySprintId(sprintId).subscribe(
          (resourceIds: number[]) => {
            this.resourceIds = resourceIds;

            // Fetch resource details for each resource ID
            resourceIds.forEach(resourceId => {
              this.resourceService.getResourceById(resourceId.toString()).subscribe(
                resourceData => {
                  // Transform resource data into desired format
                  const formattedResource = {
                    Resource_ID: resourceData.resource_id,
                    Team: resourceData.team_name,
                    Job_Role: resourceData.role_name,
                    Org_Unit: resourceData.org_unit_name,
                    Availability: 'y'
                  };
                  // Add the formatted resource data to the resources array
                  this.resources.push(formattedResource);
                },
                error => {
                  console.error('Error fetching resource data:', error);
                }
              );
            });
          },
          error => {
            console.error('Error fetching resource IDs:', error);
          }
        );
      },
      error => {
        console.error('Error fetching sprint details:', error);
      }
    );
  }

}
