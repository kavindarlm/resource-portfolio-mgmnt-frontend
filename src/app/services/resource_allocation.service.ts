import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceAllocationService {
  private baseUrl = 'http://localhost:3000/resource_allocation';

  constructor(private http: HttpClient) { }

  getTasksByResourceId(resourceId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${resourceId}/tasks`);
  }
  getResourceIdsBySprintId(sprintId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/resource-ids/${sprintId}`);
  }
}
