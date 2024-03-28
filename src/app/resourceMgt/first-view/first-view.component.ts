import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import { ResourceModel } from './first-view.model';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service'; // Adjust the path as necessary


@Component({
  selector: 'app-first-view',
  templateUrl: './first-view.component.html',
  styleUrl: './first-view.component.css'
})
export class FirstViewComponent implements OnInit {

  showResourceDetails: boolean = false;//first not to show the form
  resourceList: any[]=[];
  formValue !: FormGroup;
  resourceObject: any;//but the resource object is available on the add-form component
  showForm = false;

  constructor(private http:HttpClient, private resourceService: ResourceService) {}


  ngOnInit(): void {
    this.loadResources();
  }

  // loadResources() {
  //   this.http.get("assets/jsonFiles-resourceMgt/getResources.json").subscribe((res:any)=>{
  //     debugger;
  //     this.resourceList = res.data;
  //   })
  // }

  loadResources() {
    this.http.get("http://localhost:3000/resources").subscribe((res:any)=>{
      this.resourceList = res; // Assuming the response is directly the array of resources
    })
  }
  

  showcomponent(): void{
    this.showForm =! this.showForm;
  }


  //just to make sure row button works
  rowClick(event: any, resource: any) {
    // Remove the background color from all rows
    var rows = document.querySelectorAll(".clickable-row");
    rows.forEach(function(row) {
        row.classList.remove("active-row");
    });
    
    // Add background color to the clicked row
    event.currentTarget.classList.add("active-row");

    //to use the service
    this.resourceService.clickedResource = resource;
    this.resourceObject = resource;
    this.showResourceDetails = true; // Show the AddFormComponent

    // Do something when the row is clicked, (get data to the console)
    console.log("Row clicked: ", resource);
    this.resourceService.clickedResource = resource; // Ensure clicked resource is correctly stored
    console.log("Clicked Resource:", this.resourceService.clickedResource); // Log clicked resource data
    
}


}