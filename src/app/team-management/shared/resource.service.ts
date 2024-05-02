import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

   //service to get resources from the database

   private baseUrl = 'http://localhost:3000/resource'; // Adjust the port if needed

   constructor(private http: HttpClient) { }

   getResourcesForSprint(): Observable<any[]> {
    // Send a GET request to the '/ForSprint' endpoint
    return this.http.get<any[]>(`${this.baseUrl}/ForSprint`);
  }

  //Method to find one resource by ID
  findOneResource(resourceId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${resourceId}`);
  }
 
   // Method to get resources
   getResources(): Observable<any> {
     return this.http.get(`${this.baseUrl}`);
   }

   // Method to get resources by team id
   getResourcesByTeamIdAndNull(teamId: number): Observable<{resourceId: number, roleName: string, unitName: string }[]> {
    return this.http.get<{resourceId: number, roleName: string, unitName: string }[]>(`${this.baseUrl}/${teamId}`);
  }
  
  // Method to get resources by team id
  getResourcesByTeamId(teamId: number): Observable<{resourceId: number, roleName: string, unitName: string, teamId: number }[]> {
    return this.http.get<{resourceId: number, roleName: string, unitName: string, teamId: number }[]>(`${this.baseUrl}/${teamId}`);
  }

}

