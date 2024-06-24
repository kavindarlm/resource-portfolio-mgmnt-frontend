import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpParams } from '@angular/common/http';

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

  // Method to get resources which teamId is null and filter by job role and org unit
  getResourcesByTeamIdNull(jobRole?: string, orgUnit?: string): Observable<any> {
    let params = new HttpParams();
    if (jobRole) {
      params = params.append('jobRole', jobRole);
    }
    if (orgUnit) {
      params = params.append('orgUnit', orgUnit);
    }
    return this.http.get(`${this.baseUrl}/no-team`, { params });
  }

  //get the job roles for filtering
  getJobRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/jobRoles`);
  }

  //get the unit for filtering
  getOrgUnits(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/orgUnits`);
  }
  
  // Method to get resources by team id and null
  getResourcesByTeamIdAndNull(teamId: number): Observable<{resourceId: string, roleName: string, unitName: string }[]> {
    return this.http.get<{resourceId: string, roleName: string, unitName: string }[]>(`${this.baseUrl}/team/null/${teamId}`);
  }

  // Method to get resources by team id
  getResourcesByTeamId(teamId: number, jobRole?: string, orgUnit?: string): Observable<{resourceId: string, roleName: string, unitName: string, teamId: number }[]> {
    let params = new HttpParams();
    if (jobRole) {
      params = params.append('jobRole', jobRole);
    }
    if (orgUnit) {
      params = params.append('orgUnit', orgUnit);
    }
    return this.http.get<{resourceId: string, roleName: string, unitName: string, teamId: number }[]>(`${this.baseUrl}/team/${teamId}`, { params });
  }

  // Method to get resources for team
  getResourcesForTeam(): Observable<{resourceId: string, roleName: string, unitName: string }[]> {
    return this.http.get<{resourceId: string, roleName: string, unitName: string }[]>(`${this.baseUrl}/team`);
  }

}
