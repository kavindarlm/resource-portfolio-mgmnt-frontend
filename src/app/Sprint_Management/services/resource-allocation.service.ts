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

  getTasksByResourceId(resourceId: string): Observable<{  resourceAllocation: any }[]> {
    return this.http.get<{ task: any, resourceAllocation: any }[]>(`${this.baseUrl}/${resourceId}`).pipe(
      catchError(error => {
        console.error('Error fetching tasks and resource allocations:', error);
        // Return an empty array or a suitable fallback value in case of an error
        return of([]);
      })
    );
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

  // Method to update a resource allocation by ID
  updateResourceAllocationPercentage(id: number, updateData: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`; // Construct the URL with the base URL and resource ID
    return this.http.patch<any>(url, updateData).pipe(
      catchError((error) => {
        console.error('Error updating resource allocation:', error);
        // Return a null or suitable fallback value in case of an error
        return of(null);
      })
    );
  }

  // Method to update the task ID for a resource allocation
  updateResourceAllocationTaskId(id: number, taskId: number): Observable<any> {
    const url = `${this.baseUrl}/${id}/task/${taskId}`;
    return this.http.patch<any>(url, {}).pipe(
      catchError((error) => {
        console.error('Error updating resource allocation task ID:', error);
        return of(null);
      })
    );
  }

}
