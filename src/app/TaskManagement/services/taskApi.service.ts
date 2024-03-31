import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { projectModel, taskModel } from "../dataModels/projectModel";

@Injectable({
    providedIn: 'root'
})
export class taskApiService{
    constructor(private http:HttpClient){}

    //getprojectList
  getProjectList(){ 
    // return this.http.get<datamodel[]>("http://localhost:3000/posts");
    return this.http.get<projectModel[]>("http://localhost:3000/project"); 
  }

  fetchProject(id:string){
    // return this.http.get<datamodel>("http://localhost:3000/posts/"+id);
    return this.http.get<projectModel>("http://localhost:3000/project/"+id)
  }

  getTaskList(id:string){
    return this.http.get<taskModel>("http://localhost:3000/task/project/"+id)
  }
}