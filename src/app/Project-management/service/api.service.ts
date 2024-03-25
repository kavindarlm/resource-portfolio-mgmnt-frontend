import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datamodel } from '../create-project/modelproject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  //AddProject
  addProject(data:datamodel){
    // return this.http.post<datamodel>("http://localhost:3000/posts",data);
    return this.http.post<datamodel>("http://localhost:3000/project",data);
  }
  //GetProjectDetails
  getProjectList(){ 
    // return this.http.get<datamodel[]>("http://localhost:3000/posts");
    return this.http.get<datamodel[]>("http://localhost:3000/project");
  }
  //FetchProjectDetails
  fetchProject(id:string){ 
    // return this.http.get<datamodel>("http://localhost:3000/posts/"+id);
    return this.http.get<datamodel>("http://localhost:3000/project/"+id)
  }
  //UpdateProjectDetails
  updateProject(data: datamodel,id: string){ 
    // return this.http.put<datamodel>("http://localhost:3000/posts/"+id,data);
    return this.http.put<datamodel>("http://localhost:3000/project/"+id,data);
  }

  //DeleteProject
  deleteProject(id: string){
    return this.http.delete<datamodel>("http://localhost:3000/project/"+id);
  }

  //Number of ongoing projects
  getProjectCount() {
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
}
