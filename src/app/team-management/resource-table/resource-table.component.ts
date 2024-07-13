import { Component } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { ResourceService } from '../shared/resource.service';
import { Resource } from '../team-form/team-form.model';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent {

  selectedResources: any[] = []; // Define the selectedResources property
  resources: any; // Define the resources property
  errorMessage: string = ''; // Define the errorMessage property
  currentPage = 1;
  itemsPerPage = 5;
  totalPages!: number;

  jobRoles: string[] = []; // array to store job roles for filtering
  orgUnits: string[] = []; // array to store org units for filtering
  selectedJobRole!: string; // selected job role in drop down
  selectedOrgUnit!: string; //selected org unit in drop down

  constructor(private service: ServiceService,
              private resourceService: ResourceService,
              private refreshData: SidebarheaderServiceService
  ) {}

  ngOnInit() {
    this.loadResources(); // load resource to resource table 
    this.resourceService.getJobRoles().subscribe(jobRoles => this.jobRoles = jobRoles);// get job roles to fiter resources
    this.resourceService.getOrgUnits().subscribe(orgUnits => this.orgUnits = orgUnits);//get org units to filter resources

    // Refresh System
    this.refreshData.refreshSystem$.subscribe(() => {
      this.loadResources(); // Reload resource list when a new resource is added
    });
  }


// Method to load resources and to filter by org unit and job role
 loadResources(jobRole?: string, orgUnit?: string) {
  this.resourceService.getResourcesByTeamIdNull(jobRole, orgUnit).subscribe(
    data => {
      this.resources = data;
      this.totalPages = Math.ceil(this.resources.length / this.itemsPerPage);
    },
    error => {
      console.error('An error occurred while loading resources:', error);
      this.errorMessage = 'An error occurred while loading resources. Please try again later.';
    }
  );
}

  // Method to select a resource
  onSelect(resource: Resource) {
    const index = this.selectedResources.findIndex(selectedResource => selectedResource.resourceId === resource.resourceId);
  
    if (index === -1) {
      this.service.addSelectedResource(resource);
      this.selectedResources.push(resource);
    } else {
      this.selectedResources.splice(index, 1);
      this.service.addSelectedResource(resource);
    }
  }


  // Method to check if a resource is selected
  isSelected(resource: Resource): boolean {
    return this.selectedResources.some(selectedResource => selectedResource.resourceId === resource.resourceId);
  }
  

   // Method to search for a resource
   searchtext: any;

    // Function to get paginated list of resources
    getPaginatedResourceList(): Resource[] | undefined {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, (this.resources?.length || 0));
      return this.resources?.slice(startIndex, endIndex);
    }

    // Function to set current page
    setPage(page: number) {
      this.currentPage = page;
    }

}