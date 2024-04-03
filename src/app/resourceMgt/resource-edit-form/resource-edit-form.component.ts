import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service';///////////////////////
import { ResourceModel } from '../add-form/addformmodel';
import { Observable } from 'rxjs';
import { FirstViewComponent } from '../first-view/first-view.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-resource-edit-form',
  templateUrl: './resource-edit-form.component.html',
  styleUrl: './resource-edit-form.component.css'
})
export class ResourceEditFormComponent implements OnInit{

  jobroles: any[] = []; //creating an array for jobroles
  orgunits: any[] = []; //creating an array for orgunits

  formValue!: FormGroup; 
  selectedResource: any; 
  resourceObject: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();// calling the loadOrgUnits Method

    this.formValue = this.formBuilder.group({
      resourceName: [''],
      resourceId: [''],
      roleId: [''],
      unitId: ['']
    });

    this.selectedResource = this.resourceService.getData();
    console.log('Selected Resource:', this.selectedResource);// to check the structure and values of this.selectedResource
    this.setFormData();
  }

  setFormData() {
    this.formValue.patchValue({
      resourceName: this.selectedResource.resourceName,
      resourceId: this.selectedResource.resourceId,
      roleId: this.selectedResource.roleId,
      unitId: this.selectedResource.unitId
    });
  }

  loadJobRoles() { //a function to get data from the json file(jobroles)
    this.http.get("assets/jsonFiles-resourceMgt/jobRoles.json")
    .pipe(
      catchError((error) => {
        console.error('Error fetching job roles:', error);
        // Handle error gracefully, such as showing an alert to the user.
        return throwError('Error fetching job roles');
      })
    )
    .subscribe((res: any) => {
      debugger;
      this.jobroles = res.data;//the response from this asset file(jobroles.json) will be stored in this array
    })
  }

  loadOrgUnits() {
    this.http.get("assets/jsonFiles-resourceMgt/orgunits.json")
    .pipe(
      catchError((error) => {
        console.error('Error fetching organizational units:', error);
        // Handle error gracefully, such as showing an alert to the user.
        return throwError('Error fetching organizational units');
      })
    )
    .subscribe((res: any) => {
      debugger;
      this.orgunits = res.data;
    })
  }



  onEditResource(data: ResourceModel) {
    console.log(data);
    this.resourceService.updateResource(this.selectedResource.resourceId, data)
      .subscribe(
        (res: any) => {
          debugger;
          console.log('Resource updated successfully:', res);
          alert('Resource updated Successfully');
          // this.router.navigate([])
          // Optionally, you might want to perform additional actions here, such as showing a success message or navigating to another page.
        },
        (error) => {
          console.error('Error occurred while updating resource:', error);
          // Handle error appropriately, such as displaying an error message to the user.
        }
      );
  }
  
  onDeleteResource() {
    this.resourceService.deleteResource(this.selectedResource.resourceId)
    .subscribe((res:ResourceModel)=> {
      console.log('Resource deleted successfully:', res);
    },
    (error) => {
      console.error('Error occurred while deleting resource:', error);
      // Handle error appropriately, such as displaying an error message to the user.
    }
    );
  }

}
