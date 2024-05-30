import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TaskApiResponse, projectModel, taskModel, taskUpdateModel } from "../dataModels/projectModel";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class taskApiService {

  private baseUrl = 'http://localhost:3000/task';

  constructor(private http: HttpClient) { }

  getProjectInfoByTaskId(taskId: number): Observable<{ projectName: string, projectId: number } | null> {
    const url = `${this.baseUrl}/${taskId}`;
    // Specify the expected response type as JSON
    return this.http.get<{ projectName: string, projectId: number } | null>(url);
}
  //Function for get projectList
  getProjectList() {
    return this.http.get<projectModel[]>("http://localhost:3000/project");
  }

  //Function for Fetch Project
  fetchProject(id: string) {
    return this.http.get<projectModel>("http://localhost:3000/project/" + id)
  }

  //Function for Get Task List
  getTaskList(id: string) {
    return this.http.get<taskModel[]>("http://localhost:3000/task/project/" + id)
  }

  //Function to Add Task
  addTask(data: taskModel,id: string): Observable<TaskApiResponse>{
    return this.http.post<TaskApiResponse>("http://localhost:3000/task/newtask/"+id,data);
  }

  //Function to Get Task By Id
  getTaskByid(id: string) {
    return this.http.get<taskModel>("http://localhost:3000/task/getTask/" + id);
  }

  //Function to Update Task Persentage
  updatetaskPersentage(id: string, data: taskModel) {
    return this.http.put<taskUpdateModel>("http://localhost:3000/task/" + id, data);
  }

  //search Project
  searchProject(projectName: string) {
    const params = new HttpParams().set('s', projectName);
    return this.http.get<projectModel[]>("http://localhost:3000/project/searchprojectName/search", { params });
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
  getProjectProgress(id: string): Observable<number> {
    return this.http.get<number>("http://localhost:3000/task/project-progress/"+id);
  }

  //Serch Task
  searchTaskByName(taskName: string){
    const params = new HttpParams().set('s', taskName);
    return this.http.get<taskModel[]>("http://localhost:3000/task/searchtaskName/search", { params });
  }
  
}