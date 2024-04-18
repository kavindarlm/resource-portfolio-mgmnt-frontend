import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JobRoleModel } from "../../resourceMgt/add-form/addformmodel";

@Injectable({
    providedIn: 'root'
  })

  export class JobRoleService {

    constructor(private http:HttpClient) {}

    getJobRoles() {
        return this.http.get<JobRoleModel[]>("http://localhost:3000/job-role");
      }
  }