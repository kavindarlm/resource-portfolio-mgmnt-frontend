import { Component } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceleaveService } from '../shared/resourceleave.service';


@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css'
})
export class ResourceListComponent {
  resources: any; // Define the resources property
  errorMessage: string = ''; // Define the errorMessage property
  searchtext: any;// Define the searchText property

  constructor(private router: Router,
     private route: ActivatedRoute, 
     private apiService: ApiServiceService,
     private resourceleave : ResourceleaveService) { }

  ngOnInit() {
    this.loadResources(); // Ensure backend connection here
  }

 // Method to load resources
 loadResources() {
  try {
    this.apiService.getResources().subscribe(
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

  
rowClick(event: any, resource: any) {
  // Remove the background color from all rows
  var rows = document.querySelectorAll(".clickable-row");
  rows.forEach(function (row) {
    row.classList.remove("active-row");
  });

  // Add background color to the clicked row
  event.currentTarget.classList.add("active-row");

  // Use the service to set the clicked resource
  this.resourceleave.setData(resource);

  // Do something when the row is clicked, (get data to the console)
  console.log("Row clicked: ", resource);
  console.log("Clicked Resource:", resource); // Log clicked resource data
  this.resourceleave.setData(resource); 

  // Navigate to the resourceleave/:id route relative to the current route
  this.router.navigate([ 'resourceleave', resource.resourceId], { relativeTo: this.route });

}
}
