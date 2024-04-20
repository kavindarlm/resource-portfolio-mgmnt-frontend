import { Component } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { ResourceService } from '../shared/resource.service';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent {

  selectedResources: any[] = []; // Define the selectedResources property
  resources: any; // Define the resources property
  errorMessage: string = ''; // Define the errorMessage property

  constructor(private service: ServiceService,
              private resourceService: ResourceService
  ) {}

  ngOnInit() {
    this.loadResources(); // Ensure backend connection here
  }

  // Method to load resources
  loadResources() {
    try {
      this.resourceService.getResources().subscribe(
        data => {
          this.resources = data;
          this.errorMessage = ''; // Clear the error message when the request is successful
        },
        error => {
          console.error('An error occurred while loading resources:', error);
          // Set the error message when there's an error
          this.errorMessage = 'An error occurred while loading resources. Please try again later.';
        }
      );
    } catch (error) {
      console.error('An error occurred while loading resources:', error);
      // Set the error message when there's an error
      this.errorMessage = 'An error occurred while loading resources. Please try again later.';
    }
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

}