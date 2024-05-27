import { Component } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { ResourceService } from '../shared/resource.service';
import { Resource } from '../team-form/team-form.model';

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

  constructor(private service: ServiceService,
              private resourceService: ResourceService
  ) {}

  ngOnInit() {
    this.loadResources(); // Ensure backend connection here
  }

  // Method to load resources
  loadResources() {
    this.resourceService.getResourcesByTeamIdNull().subscribe(
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
  onSelect(resource: any) {
    this.service.addSelectedResource(resource);
    const index = this.selectedResources.indexOf(resource);

    if (index === -1) {
      this.selectedResources.push(resource);
    } else {
      this.selectedResources.splice(index, 1);
    }
  }

  // Method to check if a resource is selected
  isSelected(resource: any): boolean {
    return this.selectedResources.includes(resource);
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