import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { ResourceService } from '../shared/resource.service';
import { ActivatedRoute } from '@angular/router';

// Define the Resource interface
interface Resource {
  resourceId: number;
  roleName: string;
  unitName: string;
  teamId?: number;
}

@Component({
  selector: 'app-update-resourc-table',
  templateUrl: './update-resourc-table.component.html',
  styleUrls: ['./update-resourc-table.component.css']
})

export class UpdateResourcTableComponent {

  selectedResources: any[] = []; // Define the selectedResources property
  teamResources: Resource[] = []; // Define the teamResources property
  searchtext: any; // Define the searchtext property
  errorMessage: string = ''; // Define the errorMessage property
  currentPage = 1;
  itemsPerPage = 5;
  totalPages!: number;
  resources: Resource[] = []; // Define the resources property
  // resources: { resourceId: number; roleName: string; unitName: string; }[] = []; // Define the resources property
  @Input() teamId: number | undefined = undefined; // Define the teamId property
  @Output() resourcesSelected = new EventEmitter<any[]>(); // Define the resourcesSelected property


  constructor(private service: ServiceService,
    private resourceService: ResourceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    try {
      // get the team resource data
      this.route.params.subscribe(params => {
        const teamId = +params['teamId'];
        if (this.teamId !== undefined) {
          this.loadResources(this.teamId);
        }
      });

      // get the team resource data
      this.resourceService.getResourcesByTeamId(4).subscribe(resources => {
        this.teamResources = resources;
        this.errorMessage = ''; // Clear the error message when the request is successful
      }, error => {
        console.error(error);
        // Set the error message when there's an error
        this.errorMessage = 'An error occurred while fetching team resources. Please try again later.';
      });
    } catch (error) {
      console.error('An error occurred while initializing:', error);
      // Set the error message when there's an error
      this.errorMessage = 'An error occurred while initializing. Please try again later.';
    }
  }

  // Method to load resources
  loadResources(teamId: number): void {
    try {
      this.resourceService.getResourcesByTeamIdAndNull(teamId).subscribe(resources => {
        this.resources = resources;
        this.errorMessage = ''; // Clear the error message when the request is successful
      }, error => {
        console.error(error);
        // Set the error message when there's an error
        this.errorMessage = 'An error occurred while loading resources. Please try again later.';
      });
    } catch (error) {
      console.error('An error occurred while loading resources:', error);
      // Set the error message when there's an error
      this.errorMessage = 'An error occurred while loading resources. Please try again later.';
    }
  }

  // Method to check if a resource is in the team
  isTeamResource(resource: Resource): boolean {
    return this.teamResources.some(teamResource => teamResource.resourceId === resource.resourceId);
  }

  // Method to handle resource selection
  handleResourceSelection(resource: any): void {
    try {
      resource.selected = true;
      this.resourcesSelected.emit(resource);

      const index = this.selectedResources.findIndex(selectedResource => selectedResource.resourceId === resource.resourceId);
      if (index > -1) {
        // If the resource is already in selectedResources, remove it
       
        this.selectedResources = [
          ...this.selectedResources.slice(0, index),
          ...this.selectedResources.slice(index + 1)
        ];
      } else {
        // If the resource is not in selectedResources, add it
        this.selectedResources.push(resource);
      }
      this.resourcesSelected.emit(this.selectedResources);
      console.log('Resource selected in UpdateResourcTableComponent:', resource);
      this.errorMessage = ''; // Clear the error message when the request is successful
    } catch (error) {
      console.error('An error occurred while handling resource selection:', error);
      // Set the error message when there's an error
      this.errorMessage = 'An error occurred while handling resource selection. Please try again later.';
    }
  }

  // Method to check if a resource is selected
  isSelected(resource: any): boolean {
    return this.selectedResources.some(selectedResource => selectedResource.resourceId === resource.resourceId);
  }

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