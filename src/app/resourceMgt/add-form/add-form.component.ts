import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { ResourceModel } from './add-form.model';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service'; // Adjust the path as necessary
import { ResourceModel } from './addformmodel';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})

export class AddFormComponent implements OnInit {
  selectedResource: any;
  resourceForm !: FormGroup;

  jobroles: any[] = []; //creating an array for jobroles
  orgunits: any[] = []; //creating an array for orgunits

  //Creating a resource object
  // resourceObject: any = { 
  //   "resourceName": "",
  //   "resourceId": "",
  //   "jobRole": "",
  //   "roleId": "",
  //   "orgUnit": "",
  //   "unitId": ""
  // }
  // formBuilder: any;

  // resourceModelObject : ResourceModel = new ResourceModel()


  constructor(private http: HttpClient, private resourceService: ResourceService, private formBuilder: FormBuilder) { } // Have to include the HttpClient Module in app.model too
  ngOnInit(): void {
    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();

    this.resourceForm = this.formBuilder.group({
      resourceName: [''],
      resourceId: [''],
      roleId: [''],
      unitId: ['']
    });
    

  }

  // createResource(){
  //   this.resourceService.createResource(this.datat).subscribe((res=>{

  //   }))
  // }
  loadJobRoles() { //a function to get data from the json file(jobroles)
    this.http.get("assets/jsonFiles-resourceMgt/jobRoles.json").subscribe((res: any) => {
      // debugger;
      this.jobroles = res.data;//the response from this asset file(jobroles.json) will be stored in this array
    })
  }

  loadOrgUnits() {
    this.http.get("assets/jsonFiles-resourceMgt/orgunits.json").subscribe((res: any) => {
      // debugger;
      this.orgunits = res.data;
    })
  }

  // onCreateResource() {
  //   debugger;
  //   this.http.post("assets/jsonFiles-resourceMgt/postResources.json", this.resourceObject).subscribe((res: any) => {
  //     alert(res.message)
  //   })
  // }

  ///////////////correct/////
  // onCreateResource() {
  //   this.http.post("http://localhost:3000/resources", this.resourceObject).subscribe((res: any) => {
  //     alert(res.message);
  //   })
  // }

  // onCreateResource() {
  //   console.log('Form Value:', this.formValue.value);
  //   console.log('Sending resource object:', this.resourceObject);
  //   this.http.post("/resources", this.resourceObject)
  //     .subscribe(
  //       (res: any) => {
  //         console.log('Response:', res);
  //         alert(res.message);
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //         alert('An error occurred. Please try again.');
  //       }
  //     );
  // }
  

  sendData(data: ResourceModel) {
    console.log(data);
    // debugger;
     const dataToSend = this.resourceForm.value;
     this.resourceService.createResource(data).subscribe((res=>{
      console.log(data)
      }))
     // Sample data
    // this.resourceService.setData(dataToSend);
    // this.resourceService.createResource(dataToSend);
  }

  // rowClick($event: any, resource: any) {
  //   this.resourceObject = resource;
  // }
}