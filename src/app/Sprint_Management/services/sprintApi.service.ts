import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class sprintApiService {

    private apiUrl = 'http://localhost:3000/sprint';

    constructor(private http: HttpClient) { }

    // Method to fetch all sprints
    getAllSprints(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Method to create a new sprint
    createSprint(sprintData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, sprintData);
    }
}