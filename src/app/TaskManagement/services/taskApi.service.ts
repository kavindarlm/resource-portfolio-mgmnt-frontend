import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TaskApiResponse, projectModel, taskModel, taskUpdateModel } from "../dataModels/projectModel";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class taskApiService{
    constructor(private http:HttpClient){}

  //Function for get projectList
  getProjectList(){ 
    return this.http.get<projectModel[]>("http://localhost:3000/project"); 
  }
  //Function forFetch Project
  fetchProject(id:string){
    return this.http.get<projectModel>("http://localhost:3000/project/"+id)
  }

  //Function for Get Task List
  getTaskList(id:string){
    return this.http.get<taskModel[]>("http://localhost:3000/task/project/"+id)
  }

  //Function to Add Task
  addTask(data: taskModel,id: string): Observable<TaskApiResponse>{
    return this.http.post<TaskApiResponse>("http://localhost:3000/task/newtask/"+id,data);
  }

  //Function to Get Task By Id
  getTaskByid(id: string){
    return this.http.get<taskModel>("http://localhost:3000/task/"+id);
  }

  //Function to Update Task Persentage
  updatetaskPersentage(id: string, data: taskModel){
    return this.http.put<taskUpdateModel>("http://localhost:3000/task/"+id,data);
  }

  //search Project
  searchProject(projectName: string){
    const params = new HttpParams().set('s', projectName);
    return this.http.get<projectModel[]>("http://localhost:3000/project/searchprojectName/search", {params});
  }

  //Edit Task Details
  editTaskDetails(id:string,data: taskModel){
    return this.http.put<taskModel>("http://localhost:3000/task/updateTaskProgress/"+id,data);
  }

  //Delete Task
  deleteTask(id:string){
    return this.http.delete<taskModel>("http://localhost:3000/task/deletetask/"+id);
  }

  //Get the Task sum of task allocation percentage
  getProjectTaskSumByProjectId(id: string){
    return this.http.get<number>("http://localhost:3000/task/sum-allocation/"+id);
  }

  //Get the overoll Project Progress
  // getProjectProgress(id: string){
  //   return this.http.get<number>("http://localhost:3000/task/project-progress/"+id);
  // }
  getProjectProgress(id: string): Observable<number> {
    return this.http.get<number>("http://localhost:3000/task/project-progress/"+id);
  }
}