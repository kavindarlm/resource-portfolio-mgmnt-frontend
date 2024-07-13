import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class sprintApiService {

    private apiUrl = environment.baseUrl +'/sprint';

    constructor(private http: HttpClient) { }

    // Method to fetch all sprints
    getAllSprints(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    //Method to fetch sprints by ID
    findOneById(sprintId: number): Observable<any> {
        const url = `${this.apiUrl}/${sprintId}`;
        return this.http.get<any>(url);
    }

    // Method to create a new sprint
    createSprint(sprintData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, sprintData);
    }

    // Method to get the last sprint ID
    getLastSprintId(): Observable<number | null> {
        const url = `${this.apiUrl}/last-id`;
        return this.http.get<number | null>(url);
    }

    // Method to fetch sprint by name
    findOneByName(sprintName: string): Observable<any> {
        const url = `${this.apiUrl}/name/${sprintName}`;
        return this.http.get<any>(url);
    }

    // Method to update a sprint
    updateSprint(sprintId: number, updateSprintDto: any): Observable<any> {
        const url = `${this.apiUrl}/${sprintId}`;
        return this.http.put<any>(url, updateSprintDto);
    }

    // Method to delete a sprint by ID
    deleteSprint(sprintId: number): Observable<void> {
        const url = `${this.apiUrl}/${sprintId}`;
        return this.http.delete<void>(url);
    }


}