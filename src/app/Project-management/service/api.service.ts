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
    return this.http.post<datamodel>("/projects",data);
  }
  //GetProjectDetails
  getProjectList(){
    // return this.http.get<datamodel[]>("http://localhost:3000/posts");
    return this.http.get<datamodel[]>("/projects");
  }
  //FetchProjectDetails
  fetchProject(id:string){ 
    // return this.http.get<datamodel>("http://localhost:3000/posts/"+id);
    return this.http.get<datamodel>("/projects/"+id)
  }
  //UpdateProjectDetails
  updateProject(data: datamodel,id: string){ 
    // return this.http.put<datamodel>("http://localhost:3000/posts/"+id,data);
    return this.http.put<datamodel>("/projects/"+id,data);
  }

  //DeleteProject
  deleteProject(id: string){
    return this.http.delete<datamodel>("/projects/"+id);
  }
}
