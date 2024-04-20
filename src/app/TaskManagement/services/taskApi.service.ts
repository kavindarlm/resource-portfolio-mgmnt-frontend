import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { projectModel, taskModel, taskUpdateModel } from "../dataModels/projectModel";

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
    return this.http.get<taskModel[]>("http://localhost:3000/task/project/"+id)
  }

  addTask(data: taskModel,id: string){
    return this.http.post<taskModel>("http://localhost:3000/task/newtask/"+id,data);
  }

  getTaskByid(id: string){
    return this.http.get<taskModel>("http://localhost:3000/task/"+id);
  }

  updatetaskPersentage(id: string, data: taskModel){
    return this.http.put<taskUpdateModel>("http://localhost:3000/task/"+id,data);
  }

  //search Project
  searchProject(projectName: string){
    const params = new HttpParams().set('s', projectName);
    return this.http.get<projectModel[]>("http://localhost:3000/project/searchprojectName/search", {params});
  }
  
}