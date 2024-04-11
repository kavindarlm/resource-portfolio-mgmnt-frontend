import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SprintManagementService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getAllSprints(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/sprint`);
  }

  saveSprint(sprintData: any): Observable<any> {
    const url = `${this.baseUrl}/sprint`;
    return this.http.post<any>(url, sprintData);
  }


  
}
