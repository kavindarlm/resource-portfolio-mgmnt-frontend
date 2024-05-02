import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceAllocationService {

  private baseUrl = 'http://localhost:3000/resource-allocation';

  constructor(private http: HttpClient) { }

  getTasksByResourceId(resourceId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${resourceId}`);
  }

  createResourceAllocation(resourceAllocation: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, resourceAllocation).pipe(
      catchError(error => {
        console.error('Error creating resource allocation:', error);
        return of(null); // Return a null or suitable fallback value in case of an error
      })
    );
  }

  //method to get resource allocation data by sprint_id
  getResourceAllocationBySprintId(sprintId: number): Observable<any[]> {
    const url = `${this.baseUrl}/sprint/${sprintId}`;
    return this.http.get<any[]>(url).pipe(
      catchError(error => {
        console.error('Error fetching resource allocation data by sprint_id:', error);
        // Return an empty array or a suitable fallback value in case of an error
        return of([]);
      })
    );
  }

    // Method to delete a resource allocation by ID
    deleteResourceAllocationById(resourceAllocationId: number): Observable<void> {
      const url = `${this.baseUrl}/${resourceAllocationId}`;
      return this.http.delete<void>(url);
    }

}
