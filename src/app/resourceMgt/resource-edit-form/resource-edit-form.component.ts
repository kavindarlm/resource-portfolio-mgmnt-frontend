import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service';
import { JobRoleModel, OrgUnitModel, ResourceModel } from '../add-form/addformmodel';
import { Observable } from 'rxjs';
import { FirstViewComponent } from '../first-view/first-view.component';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JobRoleService } from '../../shared/sevices_resourceMgt/jobRole.service';
import { OrgUnitService } from '../../shared/sevices_resourceMgt/orgUnit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-resource-edit-form',
  templateUrl: './resource-edit-form.component.html',
  styleUrl: './resource-edit-form.component.css'
})
export class ResourceEditFormComponent implements OnInit{

  jobroles: JobRoleModel[] | undefined; //creating an array for jobroles
  orgunits: OrgUnitModel[] | undefined;

  formValue!: FormGroup; 
  selectedResource: any; 
  resourceObject: any;

  constructor(private formBuilder: FormBuilder, 
              private http: HttpClient, 
              private resourceService: ResourceService, 
              private jobRoleService: JobRoleService, 
              private orgUnitService: OrgUnitService,
              private router: Router,
              private toaster: ToastrService,
              private spinner: NgxSpinnerService) { }

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

  loadJobRoles() {
    this.spinner.show();
    this.jobRoleService.getJobRoles()
    .pipe(
      catchError((error) => {
        console.error('Error fetching job roles:', error);
        alert('An error occurred while fetching job roles. Please try again.');
        return throwError('Error fetching job roles');
      })
    )
    .subscribe((res: any) => {
      // debugger;
      this.jobroles = res; // Assuming the response is directly the array of resources
      this.spinner.hide();
    },
      (error) => {
        console.error('Error:', error);
        // alert('An error occurred. Please try again.');
      }
    );
  }

  loadOrgUnits() {
    this.orgUnitService.getOrgUnits()
    .pipe(
      catchError((error) => {
        console.error('Error fetching org units:', error);
        alert('An error occurred while fetching org units. Please try again.');
        return throwError('Error fetching org units');
      })
    )
    .subscribe((res: any) => {
      this.orgunits = res; // Assuming the response is directly the array of resources
    },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }



  onEditResource(data: ResourceModel) {
    console.log(data);
    this.resourceService.updateResource(this.selectedResource.resourceId, data)
      .subscribe(
        (res: any) => {
          console.log('Resource updated successfully:', res);
          this.editSucceseMassege(this.selectedResource.resourceId);
          this.formValue.reset();
          this.resourceService.resourceListUpdated.emit(); // Emit the event
          this.router.navigate(['pages-body/first-view']);
        },
        (error) => {
          console.error('Error occurred while updating resource:', error);
          //display an error message to the user.
        }
      );
  }
  
  onDeleteResource() {
    this.resourceService.deleteResource(this.selectedResource.resourceId)
    .subscribe((res:ResourceModel)=> {
      console.log('Resource deleted successfully:', res);
      this.deleteSucceseMassege(this.selectedResource.resourceId);
      this.formValue.reset();
      this.resourceService.resourceListUpdated.emit(); // Emit the event
      this.router.navigate(['pages-body/first-view']);
    },
    (error) => {
      console.error('Error occurred while deleting resource:', error);
      // Handle error appropriately, such as displaying an error message to the user.
    }
    );
  }

  onCancel() {
    this.router.navigate(['pages-body/first-view']);
  }

  //Delete Success Message
  deleteSucceseMassege(resourceId: string) {
    this.toaster.success(
      `${resourceId} Deleted successfully`,
      'Resource Deleted Successfully',
      { timeOut: 3000 }
    );
  }

  //Edit Success Message
  editSucceseMassege(resourceId: string) {
    this.toaster.success(
      `${resourceId} Updated successfully`,
      'Resource Updated Successfully',
      { timeOut: 3000 }
    );
  }

}
