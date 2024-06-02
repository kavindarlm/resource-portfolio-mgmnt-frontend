import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service'; 
import { JobRoleModel, OrgUnitModel, ResourceModel } from './addformmodel';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { JobRoleService } from '../../shared/sevices_resourceMgt/jobRole.service';
import { OrgUnitService } from '../../shared/sevices_resourceMgt/orgUnit.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})

export class AddFormComponent implements OnInit {
  resourceForm !: FormGroup;
  showForm = false;
  

  jobroles: JobRoleModel[] | undefined; //creating an array for jobroles
  orgunits: OrgUnitModel[] | undefined; //creating an array for orgunits

  constructor(private http: HttpClient, 
              private resourceService: ResourceService, 
              private formBuilder: FormBuilder, 
              private jobRoleService: JobRoleService, 
              private orgUnitService: OrgUnitService,
              private router: Router,
              private toaster: ToastrService) { } 
  ngOnInit(): void {

    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();

    //Call generate Id method and store the id in resourceId
    const resourceId = this.generateUniqueId();

    this.resourceForm = this.formBuilder.group({
      resourceName: ['', Validators.required],
      resourceId: [resourceId],
      roleId: ['', Validators.required],
      unitId: ['', Validators.required]
    });

        // Subscribe to the jobRoleAdded event
        this.jobRoleService.jobRoleListUpdated.subscribe(() => {
          this.loadJobRoles(); // Reload resource list when a new resource is added
        });


  }

  //Generating an unique Id
  generateUniqueId(): string {
    const sequentialNumber = Math.floor(Math.random() * 10000);
    const paddedNumber = String(sequentialNumber).padStart(4, '0');
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return paddedNumber + randomLetter;
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
      // debugger;
      this.jobroles = res; // Assuming the response is directly the array of jobroles
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
      // debugger;
      this.orgunits = res; // Assuming the response is directly the array of orgunits
    },
      (error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    );
  }

  sendData(data: ResourceModel) {
    console.log(data);
    // debugger;
    if (this.resourceForm.invalid) {
      return;
    }
    const dataToSend = this.resourceForm.value;
    this.resourceService.createResource(data)
    .pipe(
      catchError((error) => {
        console.error('Error creating resource:', error);
        return throwError('Error creating resource');
      })
    )
    .subscribe((res => {
      console.log(data);
      this.resourceForm.reset();
      this.addsuccesemassege(data.resourceId);
      this.resourceService.resourceListUpdated.emit(); // Emit the event
      this.router.navigate(['pages-body/first-view']);
    }))
  }

    //This is for success message
    addsuccesemassege(resourceId: string) {
      this.toaster.success(
        `${resourceId} Added successfully`,
        'Created Resource',
        {
          timeOut: 3000,
        }
      );
    }

    capitalizeFirstLetter() {
      const resourceNameControl = this.resourceForm.get('resourceName');
      if (resourceNameControl && resourceNameControl.value && resourceNameControl.value.length > 1) {
        let words = resourceNameControl.value.split(' ');
        words = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1));
        resourceNameControl.setValue(words.join(' '));
      }
    }

    //Event call to call the function to add a new job role
    onJobRoleChange(event: any) {
      if (event.target.value === 'other') {
        this.addNewJobRole();
      }
    }
  
    addNewJobRole() {
      this.showForm = !this.showForm;
      // alert('Add new job role functionality triggered!');
    }

}