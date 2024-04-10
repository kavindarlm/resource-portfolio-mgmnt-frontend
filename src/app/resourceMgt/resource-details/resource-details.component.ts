import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service';
import { JobRoleModel, OrgUnitModel, ResourceModel } from '../add-form/addformmodel';
import { catchError, throwError } from 'rxjs';
import { JobRoleService } from '../../shared/sevices_resourceMgt/jobRole.service';
import { OrgUnitService } from '../../shared/sevices_resourceMgt/orgUnit.service';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrl: './resource-details.component.css'
})
export class ResourceDetailsComponent {
  sharedData: any;
  showResourceEditForm: boolean = false;//first not to show the form
  selectedResource: any;

  jobroles: JobRoleModel[] | undefined; //creating an array for jobroles
  orgunits: OrgUnitModel[] | undefined; //creating an array for orgunits

  constructor(private resourceService: ResourceService, private jobRoleService: JobRoleService, private orgUnitService: OrgUnitService) {
    this.sharedData = this.resourceService.getData();
    this.selectedResource = this.resourceService.getData();
  }

  ngOnInit(): void {
    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();// calling the loadOrgUnits Method
  }


  loadJobRoles() {
    this.jobRoleService.getJobRoles()
    .pipe(
      catchError((error) => {
        console.error('Error fetching job roles:', error);
        alert('An error occurred while fetching job roles. Please try again.');
        return throwError('Error fetching job roles');
      })
    )
    .subscribe((res: any) => {
      debugger;
      this.jobroles = res; // Assuming the response is directly the array of resources
    },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
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
      debugger;
      this.orgunits = res; // Assuming the response is directly the array of resources
    },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }

  onEdit() {
    this.showResourceEditForm = true; // Show the AddFormComponent
  }

  onDelete() {
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

  // Function to get roleName based on roleId
  getRoleName(roleId: number): string {
    if (this.jobroles) {
      const role = this.jobroles.find(role => role.roleId === roleId);
      return role ? role.roleName : 'Unknown Role';
    }
    return 'Unknown Role';
  }

  //Function to get unitName based on unitId
  getUnitName(unitId: number): string {
    if (this.orgunits) {
      const unit = this.orgunits.find(unit => unit.unitId === unitId);
      return unit ? unit.unitName : 'Unknown Unit';
    }
    return 'Unknown Unit';
  }

}


