import { Component, Input } from '@angular/core';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ServiceService } from '../../team-management/shared/service.service';
import { SharedService } from '../services/shared.service';

interface ProjectTaskData {
  resourceId: string;
  taskId: string;
  percentage: number | null;
}

@Component({
  selector: 'app-added-resource-list',
  templateUrl: './added-resource-list.component.html',
  styleUrl: './added-resource-list.component.css'
})
export class AddedResourceListComponent {


  @Input() HeadArray: any[] = [];
  @Input() tablecontents: any[] = [];

  sharedData: ProjectTaskData[] = []; // Initialize a variable to hold shared service data

  constructor(
    private resourceService: ResourceService,
    private serviceService: ServiceService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {

    // Subscribe to the shared service's data observable
    this.sharedService.data$.subscribe(data => {
      this.sharedData = data; // Store the shared data in a variable
      this.fetchResources(); // Fetch and filter resources based on the latest shared data
    });

    // Fetch resources and team names from backend
    this.fetchResources();
  }

  fetchResources(): void {
    this.resourceService.getResourcesForSprint().subscribe(
      (data: any[]) => {
        // Filter resources based on the resource IDs in the shared data
        this.tablecontents = data.filter(resource =>
          this.sharedData.some(shared => shared.resourceId === resource.resource_id)
        ).map(resource => ({
          Resource_ID: resource.resource_id,
          Team: resource.team_name,
          Job_Role: resource.role_name,
          Org_Unit: resource.org_unit_name,
          Availability: 'y' // Placeholder for availability
        }));

        console.log('Filtered resources:', this.tablecontents);
      },
      error => {
        console.error('Error fetching resources:', error);
      }
    );
  }
}




