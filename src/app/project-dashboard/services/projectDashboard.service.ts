import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataModel } from '../../team-management/team-form/team-form.model';
import {
  MangerNameandIdModel,
  projectDataModel,
  resourceDataModel,
} from '../projct-dshbrd-model/dshbrd-project';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectDashboardService {
  private apiUrl = environment.baseUrl; // Global base URL

  constructor(private http: HttpClient) {}

  getAllProject(): Observable<projectDataModel[]> {
    return this.http.get<projectDataModel[]>(`${this.apiUrl}/project`);
  }

  //Fetch Project Details
  fetchProjectbyId(id: string) {
    return this.http.get<projectDataModel>(`${this.apiUrl}/project/${id}`);
  }

  //Fetch Resource List
  fetchResourceList(id: string) {
    return this.http.get<resourceDataModel>(`${this.apiUrl}/task/project/${id}/resources`);
  }

  //Fetch Project Progress
  fetchProjectProgress(id: string) {
    return this.http.get(`${this.apiUrl}/task/project-progress/${id}`);
  }

  //Fetch Count of Created Projects
  getCreatedProjects() {
    return this.http.get(`${this.apiUrl}/project/count/countprojects`);
  }

  //Search Project
  searchProject(projectName: string) {
    const params = new HttpParams().set('s', projectName);
    return this.http.get<projectDataModel[]>(`${this.apiUrl}/project/searchprojectName/search`, { params });
  }

  //get Project By criticalityId
  filterProjectByCriticality(criticality_id: string) {
    return this.http.get<projectDataModel[]>(`${this.apiUrl}/project/getProjectByCriticalityId/${criticality_id}`);
  }

  //get Project By ManagerId
  getProjectManagerById(projectManager_id: string) {
    return this.http.get<MangerNameandIdModel>(`${this.apiUrl}/project/resourceNameById/${projectManager_id}`);
  }

  //get criticality count as separately
  getCriticalityCount(): Observable<{ high: number; medium: number; low: number }> {
    return this.http.get<{ high: number; medium: number; low: number }>(`${this.apiUrl}/project/criticality/count`);
  }

  //get Resource Count
  getResourceCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/resource/countresources/resourcecount`);
  }

  //get Ongoing Project Count
  getOngoingProjectCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/task/projects/not-completed/count`);
  }
}