import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
@Component({
  selector: 'app-availabiility',
  templateUrl: './availabiility.component.html',
  styleUrl: './availabiility.component.css'
})
export class AvailabiilityComponent  {

  resourceId: string = '';
  resourceDetails: any = {};

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  ngOnInit(): void {
    // Retrieve resource ID from route parameters
    this.route.params.subscribe(params => {
      this.resourceId = params['id'];
      // Fetch resource details using the resource ID
      this.fetchResourceDetails();
    });
  }
  fetchResourceDetails(): void {
    // Call the resource service to fetch resource details
    this.resourceService.getResourceById(this.resourceId).subscribe(
      (data: any) => {
        this.resourceDetails = data;
      },
      (error: any) => { // Specify the type of error parameter explicitly
        console.error('Error fetching resource details:', error);
      }
    );
  }
  

  deleteContent(){
    
  }

  Projects: string[] = ['Project 01', 'Project 02', 'Project 03'];
  Tasks : string[] = ['Task 01', 'Task 02', 'Task 03'];

  AddPercentages(){
    
  }
  
}
