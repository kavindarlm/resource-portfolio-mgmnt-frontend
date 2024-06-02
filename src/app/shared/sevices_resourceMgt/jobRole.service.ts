import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { JobRoleModel } from "../../resourceMgt/add-form/addformmodel";

@Injectable({
    providedIn: 'root'
  })

  export class JobRoleService {

    //Event to update the job role list after a new job role is added
    jobRoleListUpdated = new EventEmitter<void>();

    constructor(private http:HttpClient) {}

    getJobRoles() {
        return this.http.get<JobRoleModel[]>("http://localhost:3000/job-role");
    }
    
    //Function to create a new job role
    createJobRole(data: JobRoleModel){
      return this.http.post<JobRoleModel>("http://localhost:3000/job-role",data);
    }
  }