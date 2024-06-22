import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataModel } from '../../team-management/team-form/team-form.model';
import {
  MangerNameandIdModel,
  projectDataModel,
  resourceDataModel,
  resource_count,
} from '../projct-dshbrd-model/dshbrd-project';

@Injectable({
  providedIn: 'root',
})
export class ProjectDashboardService {
  constructor(private http: HttpClient) {}

  getAllProject(): Observable<projectDataModel[]> {
    return this.http.get<projectDataModel[]>('http://localhost:3000/project');
  }

  //Fetch Project Details
  fetchProjectbyId(id: string) {
    return this.http.get<projectDataModel>(
      'http://localhost:3000/project/' + id
    );
  }

  //Fetch Resource List
  fetchResourceList(id: string) {
    return this.http.get<resourceDataModel>(
      'http://localhost:3000/task/project/' + id + '/resources'
    );
  }

  //Fetch Project Progress
  fetchProjectProgress(id: string) {
    return this.http.get('http://localhost:3000/task/project-progress/' + id);
  }

  //Fetch Count of Created Projects
  getCreatedProjects() {
    return this.http.get('http://localhost:3000/project/count/countprojects');
  }

  //Search Project
  searchProject(projectName: string) {
    const params = new HttpParams().set('s', projectName);
    return this.http.get<projectDataModel[]>(
      'http://localhost:3000/project/searchprojectName/search',
      { params }
    );
  }

  //get Project By criticalityId
  filterProjectByCriticality(criticality_id: string) {
    return this.http.get<projectDataModel[]>(
      'http://localhost:3000/project/getProjectByCriticalityId/' +
        criticality_id
    );
  }

  //get Project By ManagerId
  getProjectManagerById(projectManager_id: string) {
    return this.http.get<MangerNameandIdModel>(
      'http://localhost:3000/project/resourceNameById/' + projectManager_id
    );
  }

  //get criticality count as seperately
  getCriticalityCount(): Observable<{
    high: number;
    medium: number;
    low: number;
  }> {
    return this.http.get<{ high: number; medium: number; low: number }>(
      'http://localhost:3000/project/criticality/count'
    );
  }

  //get Resource Count
  getResourceCount(): Observable<resource_count> {
    return this.http.get<resource_count>(
      'http://localhost:3000/resource/countresources/resourcecount'
    );
  }
}
