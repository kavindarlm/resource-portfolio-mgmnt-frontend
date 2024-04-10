import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service'; // Adjust the path as necessary
import { JobRoleModel, OrgUnitModel, ResourceModel } from '../add-form/addformmodel';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JobRoleService } from '../../shared/sevices_resourceMgt/jobRole.service';
import { OrgUnitService } from '../../shared/sevices_resourceMgt/orgUnit.service';

@Component({
  selector: 'app-first-view',
  templateUrl: './first-view.component.html',
  styleUrl: './first-view.component.css'
})
export class FirstViewComponent implements OnInit {

  showResourceDetails: boolean = false;//first not to show the form
  searchText:any;
  // searchText: '';
  resourceList: ResourceModel[] | undefined;
  jobroles: JobRoleModel[] | undefined; //creating an array for jobroles
  orgunits: OrgUnitModel[] | undefined; //creating an array for orgunits
  resourceObject: any;
  showForm = false;

  constructor(private http: HttpClient, private resourceService: ResourceService, private jobRoleService: JobRoleService, private orgUnitService: OrgUnitService) { }


  ngOnInit(): void {
    this.loadResources();
    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();// calling the loadOrgUnits Method
  }


  loadResources() {
    this.resourceService.getResources()
    .pipe(
      catchError((error) => {
        console.error('Error fetching resources:', error);
        alert('An error occurred while fetching resources. Please try again.');
        return throwError('Error fetching resources');
      })
    )
    .subscribe((res: any) => {
      debugger;
      this.resourceList = res; // Assuming the response is directly the array of resources
    },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    );
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

  showcomponent(): void {
    this.showForm = !this.showForm;
  }


  //To make sure row button works
  rowClick(event: any, resource: any) {
    // Remove the background color from all rows
    var rows = document.querySelectorAll(".clickable-row");
    rows.forEach(function (row) {
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