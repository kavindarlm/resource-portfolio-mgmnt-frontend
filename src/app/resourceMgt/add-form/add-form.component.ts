import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ResourceModel } from './add-form.model';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})

export class AddFormComponent implements OnInit {
  selectedResource: any;
  formValue : FormGroup | null = null;
  resourceForm !: FormGroup;

  jobroles: any[] = []; //creating an array for jobroles
  orgunits: any[] = []; //creating an array for orgunits

  resourceObject: any = { //Creating a resource object
    "resourceName": "",
    "resourceID": "",
    "jobRole": "",
    "roleId": "",
    "orgUnit": "",
    "unitId": ""
  }
  // formBuilder: any;

  constructor(private formBuilder: FormBuilder,private http: HttpClient, public resourceService: ResourceService) { } // Have to include the HttpClient Module in app.model too
  ngOnInit(): void {
    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();
    
    //initializing a FormGroup using the FormBuilder service. This FormGroup represents your form, 
    //and it contains form controls that correspond to the fields of the resource data (resourceID, jobRole, orgUnit).
    // this.formValue = this.formBuilder.group({
    //   resourceID: [this.resourceObject.resourceID],
    //   jobRole: [this.resourceObject.jobRole],
    //   orgUnit: [this.resourceObject.orgUnit]
    // });

    this.formValue = this.formBuilder.group({
      resourceName: ['', Validators.required], // Apply validators to form controls
      resourceID: ['', Validators.required],
      jobRole: ['', Validators.required],
      orgUnit: ['', Validators.required]
    });

  }

  loadJobRoles() { //a function to get data from the json file(jobroles)
    this.http.get("assets/jsonFiles-resourceMgt/jobroles.json").subscribe((res: any) => {
      // debugger;
      this.jobroles = res.data;//the response from this asset file(jobroles.json) will be stored in this array
    })
  }

  loadOrgUnits() {
    this.http.get("assets/jsonFiles-resourceMgt/orgunits.json").subscribe((res: any) => {
      debugger;
      this.orgunits = res.data;
    })
  }

  onCreateResource() {
    // debugger;
    if(this.formValue) {
      this.http.post("assets/jsonFiles-resourceMgt/postResources.json", this.resourceObject).subscribe((res: any) => {
        alert(res.message)
      });
    }
    
  }

  sendData() {
    const dataToSend = this.resourceObject; // Sample data
    this.resourceService.setData(dataToSend);
  }

  // rowClick($event: any, resource: any) {
  //   this.resourceObject = resource;
  // }
}