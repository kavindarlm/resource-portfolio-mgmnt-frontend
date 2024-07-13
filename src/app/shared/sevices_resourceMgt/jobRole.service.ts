import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { JobRoleModel } from "../../resourceMgt/add-form/addformmodel";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JobRoleService {
private baseUrl = environment.baseUrl +'/job-role'; // Global base URL for job roles

//Event to update the job role list after a new job role is added
jobRoleListUpdated = new EventEmitter<void>();

constructor(private http: HttpClient) {}

getJobRoles() {
    return this.http.get<JobRoleModel[]>(`${this.baseUrl}`);
}

//Function to create a new job role
createJobRole(data: JobRoleModel) {
  return this.http.post<JobRoleModel>(`${this.baseUrl}`, data);
}
}