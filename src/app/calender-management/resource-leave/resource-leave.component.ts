import { Component } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { ResourceleaveService } from '../shared/resourceleave.service';

@Component({
  selector: 'app-resource-leave',
  templateUrl: './resource-leave.component.html',
  styleUrl: './resource-leave.component.css'
})
export class ResourceLeaveComponent {

 
resource: any;

constructor(private resourceleave : ResourceleaveService,
  private apiService: ApiServiceService
) { }

ngOnInit(): void {
  this.resourceleave.clickedResource.subscribe(resource => {
    this.resource = resource;

    // // Fetch resource details
    // this.apiService.getResourceDetails(resource.resourceId).subscribe(
    //   (data: any) => { // 'data' is any
    //     console.log(data); // Log the response from the backend

    //     // Assign the properties of 'data' to 'this.resource'
    //     this.resource.resourceName = data.resourceName;
    //   },
    //   error => {
    //     console.error('An error occurred while fetching resource details:', error);
    //   }
    // );
  });
}
}