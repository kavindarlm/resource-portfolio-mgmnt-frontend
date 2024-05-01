import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { projectModel, taskModel, taskUpdateModel } from "../dataModels/projectModel";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class taskApiService {

  private baseUrl = 'http://localhost:3000/task';

  constructor(private http: HttpClient) { }

  getProjectNameByTaskId(taskId: number): Observable<string | null> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.get<string | null>(url, { responseType: 'text' as 'json' });
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
  addTask(data: taskModel, id: string) {
    return this.http.post<taskModel>("http://localhost:3000/task/newtask/" + id, data);
  }

  //Function to Get Task By Id
  getTaskByid(id: string) {
    return this.http.get<taskModel>("http://localhost:3000/task/" + id);
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

}