import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from '../../shared/sevices_resourceMgt/resource.service'; // Adjust the path as necessary
import { ResourceModel } from './addformmodel';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})

export class AddFormComponent implements OnInit {
  resourceForm !: FormGroup;

  jobroles: any[] = []; //creating an array for jobroles
  orgunits: any[] = []; //creating an array for orgunits

  constructor(private http: HttpClient, private resourceService: ResourceService, private formBuilder: FormBuilder) { } // Have to include the HttpClient Module in app.model too
  ngOnInit(): void {
    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();

    this.resourceForm = this.formBuilder.group({
      resourceName: ['', Validators.required],
      resourceId: ['', Validators.required],
      roleId: ['', Validators.required],
      unitId: ['', Validators.required]
    });


  }

  loadJobRoles() { //a function to get data from the json file(jobroles)
    this.http.get("assets/jsonFiles-resourceMgt/jobRoles.json")
    .pipe(
      catchError((error) => {
        console.error('Error fetching job roles:', error);
        return throwError('Error fetching job roles');
      })
    )
    .subscribe((res: any) => {
      // debugger;
      this.jobroles = res.data;//the response from this asset file(jobroles.json) will be stored in this array
    })
  }

  loadOrgUnits() {
    this.http.get("assets/jsonFiles-resourceMgt/orgunits.json")
    .pipe(
      catchError((error) => {
        console.error('Error fetching organizational units:', error);
        return throwError('Error fetching organizational units');
      })
    )
    .subscribe((res: any) => {
      // debugger;
      this.orgunits = res.data;
    })
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