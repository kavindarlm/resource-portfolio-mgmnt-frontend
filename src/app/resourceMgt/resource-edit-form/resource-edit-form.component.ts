import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';////////////////////
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service';///////////////////////

@Component({
  selector: 'app-resource-edit-form',
  templateUrl: './resource-edit-form.component.html',
  styleUrl: './resource-edit-form.component.css'
})
export class ResourceEditFormComponent implements OnInit{

  jobroles: any[] = []; //creating an array for jobroles
  orgunits: any[] = []; //creating an array for orgunits

  formValue!: FormGroup; ////////////////////////
  selectedResource: any; /////////////////////////

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();

    this.formValue = this.formBuilder.group({
      resourceName: [''],
      resourceID: [''],
      jobRole: [''],
      orgUnit: ['']
    });

    this.selectedResource = this.resourceService.getData();
    console.log('Selected Resource:', this.selectedResource);// to check the structure and values of this.selectedResource
    this.setFormData();
  }

  setFormData() {
    this.formValue.patchValue({
      resourceName: this.selectedResource.resourceName,
      resourceID: this.selectedResource.resourceID,
      jobRole: this.selectedResource.jobRole,
      orgUnit: this.selectedResource.orgUnit
    });
  }

  loadJobRoles() { //a function to get data from the json file(jobroles)
    this.http.get("assets/jsonFiles-resourceMgt/jobroles.json").subscribe((res: any) => {
      debugger;
      this.jobroles = res.data;//the response from this asset file(jobroles.json) will be stored in this array
    })
  }

  loadOrgUnits() {
    this.http.get("assets/jsonFiles-resourceMgt/orgunits.json").subscribe((res: any) => {
      debugger;
      this.orgunits = res.data;
    })
  }

  onEditResource() {
    debugger;
    this.http.post("assets/jsonFiles-resourceMgt/putResources.json", this.selectedResource).subscribe((res: any) => {
      alert(res.message)
    })
  }
}
