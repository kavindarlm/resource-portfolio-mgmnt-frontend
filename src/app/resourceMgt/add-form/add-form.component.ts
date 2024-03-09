import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import { ResourceModel } from './add-form.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})

export class AddFormComponent implements OnInit {

  formValue !: FormGroup;
  
  jobroles: any[]=[]; //creating an array for jobroles
  orgunits: any[]=[]; //creating an array for orgunits

  resourceObject : any ={ //Creating a resource object
    "resourceName" : "",
    "resourceID" : "",
    "jobRole" : "",
    "roleId" : "",
    "orgUnit" : "",
    "unitId" : ""
  }

  constructor(private http: HttpClient) {} // Have to include the HttpClient Module in app.model too
  ngOnInit(): void {
    this.loadJobRoles();// calling the loadJobRoles Method
    this.loadOrgUnits();
  }

  loadJobRoles() { //a function to get data from the json file(jobroles)
    this.http.get("assets/jobroles.json").subscribe((res:any)=>{
      debugger;
      this.jobroles = res.data;//the response from this asset file(jobroles.json) will be stored in this array
    })
  }

  loadOrgUnits() {
    this.http.get("assets/orgunits.json").subscribe((res:any)=> {
      debugger;
      this.orgunits = res.data;
    })
  }

  onCreateResource(){
    debugger;
    this.http.post("assets/postResources.json", this.resourceObject).subscribe((res:any)=> {
      alert(res.message)
    })
  }

}