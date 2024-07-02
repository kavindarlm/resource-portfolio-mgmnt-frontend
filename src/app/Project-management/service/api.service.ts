import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { criticalityModel, datamodel, resourceIdNameModel } from '../create-project/modelproject';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.baseUrl; // Global base URL

  constructor(private http: HttpClient) { }

  // Add Project
  addProject(data: datamodel): Observable<any> {
    return this.http.post<datamodel>(`${this.baseUrl}/project`, data);
  }

  // Get Project List
  getProjectList(): Observable<datamodel[]> {
    return this.http.get<datamodel[]>(`${this.baseUrl}/project`);
  }

  // Fetch Project Details
  fetchProject(id: string) {
    return this.http.get<datamodel>(`${this.baseUrl}/project/${id}`);
  }

  // Update Project Details
  updateProject(data: datamodel, id: string) {
    return this.http.put<datamodel>(`${this.baseUrl}/project/${id}`, data);
  }

  // Delete Project
  deleteProject(id: string) {
    return this.http.delete<datamodel>(`${this.baseUrl}/project/${id}`);
  }

  // Number of ongoing projects
  getProjectCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/project/count/countprojects`);
  }

  // Number of ongoing High Critical Projects
  getHighCriticalProjectCount() {
    return this.http.get<number>(`${this.baseUrl}/project/high-criticality/count`);
  }

  // Number of ongoing Low Critical Projects
  getLowCriticalProjectCount() {
    return this.http.get<number>(`${this.baseUrl}/project/low-criticality/count`);
  }

  // Number of ongoing Medium Critical Projects
  getMediumCriticalProjectCount() {
    return this.http.get<number>(`${this.baseUrl}/project/Medium-criticality/count`);
  }

  // Search Project
  searchProject(projectName: string) {
    const params = new HttpParams().set('s', projectName);
    return this.http.get<datamodel[]>(`${this.baseUrl}/project/searchprojectName/search`, { params });
  }

  // Get Criticality
  getCriticality() {
    return this.http.get<criticalityModel[]>(`${this.baseUrl}/criticality`);
  }

  // Get Resource id and Name
  getResourceNameAndId(): Observable<resourceIdNameModel[]> {
    return this.http.get<resourceIdNameModel[]>(`${this.baseUrl}/project/getResoure/bynameAndId`);
  }
}