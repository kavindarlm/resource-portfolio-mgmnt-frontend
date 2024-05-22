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

  getResourcesByTeamIdNull(): Observable<any> {
    return this.http.get(`${this.baseUrl}/no-team`);
  }
  
  // Method to get resources by team id and null
  getResourcesByTeamIdAndNull(teamId: number): Observable<{resourceId: string, roleName: string, unitName: string }[]> {
    return this.http.get<{resourceId: string, roleName: string, unitName: string }[]>(`${this.baseUrl}/team/null/${teamId}`);
  }

  // Method to get resources by team id
  getResourcesByTeamId(teamId: number): Observable<{resourceId: string, roleName: string, unitName: string, teamId: number }[]> {
    return this.http.get<{resourceId: string, roleName: string, unitName: string, teamId: number }[]>(`${this.baseUrl}/team/${teamId}`);
  }

  // Method to get resources for team
  getResourcesForTeam(): Observable<{resourceId: string, roleName: string, unitName: string }[]> {
    return this.http.get<{resourceId: string, roleName: string, unitName: string }[]>(`${this.baseUrl}/team`);
  }

}
