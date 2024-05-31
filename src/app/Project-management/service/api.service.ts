import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { criticalityModel, datamodel, resourceIdNameModel } from '../create-project/modelproject';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  //AddProject
  addProject(data:datamodel): Observable<any>{
    return this.http.post<datamodel>("http://localhost:3000/project",data);
  }
  //GetProjectDetails
  getProjectList(): Observable<datamodel[]>{ 
    return this.http.get<datamodel[]>("http://localhost:3000/project");
  }
  //FetchProjectDetails
  fetchProject(id:string){ 
    return this.http.get<datamodel>("http://localhost:3000/project/"+id)
  }
  //UpdateProjectDetails
  updateProject(data: datamodel,id: string){ 
    return this.http.put<datamodel>("http://localhost:3000/project/"+id,data);
  }

  //DeleteProject
  deleteProject(id: string){
    return this.http.delete<datamodel>("http://localhost:3000/project/"+id);
  }

  //Number of ongoing projects
  getProjectCount(): Observable<number>{
    return this.http.get<number>("http://localhost:3000/project/count/countprojects");
  } 

  //Number of ongoing HighCriticalProjects
  getHighCriticalProjectCount(){
    return this.http.get<number>("http://localhost:3000/project/high-criticality/count");
  }

  //Number of ongoing LowCriticalProjects
  getLowCriticalProjectCount(){
    return this.http.get<number>("http://localhost:3000/project/low-criticality/count");
  }

  //Number of ongoing MediumCriticalProjects
  getMediumCriticalProjectCount(){
    return this.http.get<number>("http://localhost:3000/project/Medium-criticality/count");
  }

  //search Project
  searchProject(projectName: string){
    const params = new HttpParams().set('s', projectName);
    return this.http.get<datamodel[]>("http://localhost:3000/project/searchprojectName/search", {params});
  }

  //GetCriticality
  getCriticality(){
    return this.http.get<criticalityModel[]>("http://localhost:3000/criticality");
  }

  //Get Resource id and Name
  getResourceNameAndId(): Observable<resourceIdNameModel[]> {
    return this.http.get<resourceIdNameModel[]>('http://localhost:3000/project/getResoure/bynameAndId');
  }
}
