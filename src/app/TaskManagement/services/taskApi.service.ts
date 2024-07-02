import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResourceNameandId, TaskApiResponse, projectModel, taskModel, taskUpdateModel } from "../dataModels/projectModel";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class taskApiService {

  private baseUrl = environment.baseUrl; // Base URL

  constructor(private http: HttpClient) { }

  getProjectInfoByTaskId(taskId: number): Observable<{ projectName: string, projectId: number } | null> {
    return this.http.get<{ projectName: string, projectId: number } | null>(`${this.baseUrl}/task/${taskId}`);
  }

  getProjectList() {
    return this.http.get<projectModel[]>(`${this.baseUrl}/project`);
  }

  fetchProject(id: string) {
    return this.http.get<projectModel>(`${this.baseUrl}/project/${id}`);
  }

  getTaskList(id: string) {
    return this.http.get<taskModel[]>(`${this.baseUrl}/task/project/${id}`);
  }

  addTask(data: taskModel, id: string): Observable<TaskApiResponse> {
    return this.http.post<TaskApiResponse>(`${this.baseUrl}/task/newtask/${id}`, data);
  }

  getTaskByid(id: string) {
    return this.http.get<taskModel>(`${this.baseUrl}/task/getTask/${id}`);
  }

  updatetaskPersentage(id: string, data: taskModel) {
    return this.http.put<taskUpdateModel>(`${this.baseUrl}/task/${id}`, data);
  }

  searchProject(projectName: string) {
    const params = new HttpParams().set('s', projectName);
    return this.http.get<projectModel[]>(`${this.baseUrl}/project/searchprojectName/search`, { params });
  }

  editTaskDetails(id: string, data: taskModel) {
    return this.http.put<taskModel>(`${this.baseUrl}/task/updateTaskProgress/${id}`, data);
  }

  deleteTask(id: string) {
    return this.http.delete<taskModel>(`${this.baseUrl}/task/deletetask/${id}`);
  }

  getProjectTaskSumByProjectId(id: string) {
    return this.http.get<number>(`${this.baseUrl}/task/sum-allocation/${id}`);
  }

  getProjectProgress(id: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/task/project-progress/${id}`);
  }

  searchTaskByName(taskName: string) {
    const params = new HttpParams().set('s', taskName);
    return this.http.get<taskModel[]>(`${this.baseUrl}/task/searchtaskName/search`, { params });
  }

  getResourceNameByResourceId(resourceId: string) {
    return this.http.get<ResourceNameandId>(`${this.baseUrl}/project/resourceNameById/${resourceId}`);
  }
  
}