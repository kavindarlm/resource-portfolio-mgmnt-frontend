import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getProjectNameByTaskId(taskId: number): Observable<string | null> {
    const url = `${this.baseUrl}/${taskId}/project-name`;
    return this.http.get<string | null>(url, { responseType: 'text' as 'json' });
  }

}
