import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service';
import { JobRoleModel, OrgUnitModel, ResourceModel } from '../add-form/addformmodel';
import { catchError, throwError } from 'rxjs';
import { JobRoleService } from '../../shared/sevices_resourceMgt/jobRole.service';
import { OrgUnitService } from '../../shared/sevices_resourceMgt/orgUnit.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-resource-details',
  templateUrl: './resource-details.component.html',
  styleUrl: './resource-details.component.css'
})
export class ResourceDetailsComponent {
  sharedData: any;
  showResourceEditForm: boolean = false;//first not to show the form
  showResourceDetails: boolean = true;//first to show the resource details
  selectedResource: any;

  jobroles: JobRoleModel[] | undefined; //creating an array for jobroles
  orgunits: OrgUnitModel[] | undefined; //creating an array for orgunits

  constructor(private resourceService: ResourceService, 
              private jobRoleService: JobRoleService, 
              private orgUnitService: OrgUnitService,
              private route: ActivatedRoute,
              private toaster: ToastrService,
              private spinner: NgxSpinnerService) {
              
              
    this.sharedData = this.resourceService.getData();
    this.selectedResource = this.resourceService.getData();

  }

  ngOnInit(): void {
    //To get the resource details according to the resource id selected
    this.route.params.subscribe(params => {
      const resourceId = params['id'];
      if (resourceId) {
        this.loadResourceDetails(resourceId);
      }
    });
    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();// calling the loadOrgUnits Method
  }

  loadResourceDetails(resourceId: string) {
    this.spinner.show();
    this.resourceService.getResource(resourceId)
      .pipe(
        catchError((error) => {
          console.error('Error fetching resource details:', error);
          alert('An error occurred while fetching resource details. Please try again.');
          return throwError('Error fetching resource details');
        })
      )
      .subscribe((res: ResourceModel) => {
        this.sharedData = res;
        this.selectedResource = res;
        this.spinner.hide();
      });
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
    this.spinner.show();
    this.showResourceEditForm = true; // Show the AddFormComponent
    this.spinner.hide();
  }

  onDelete() {
    this.resourceService.deleteResource(this.selectedResource.resourceId)
    .subscribe((res:ResourceModel)=> {
      console.log('Resource deleted successfully:', res);
      this.deleteSucceseMassege(this.selectedResource.resourceId);
      this.showResourceDetails = false;
      this.resourceService.resourceListUpdated.emit(); // Emit the event
    },
    (error) => {
      console.error('Error occurred while deleting resource:', error);
      // display an error message to the user.
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

    //Delete Success Message
    deleteSucceseMassege(resourceId: string) {
      this.toaster.success(
        `${resourceId} Deleted successfully`,
        'Resource Deleted Successfully',
        { timeOut: 3000 }
      );
    }

}


