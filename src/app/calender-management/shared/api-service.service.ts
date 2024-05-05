import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { Holiday } from '../calender.model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = 'http://localhost:3000/holiday';
  

  constructor(private http: HttpClient) { }

  addEvent(selectedDates: NgbDate[], holidayType: string): Observable<any> {
    const event = { selectedDates, holidayType };
    return this.http.post(this.apiUrl, event);
  }

  // In api-service.service.ts
  // getEvents(holidayType: string) {
  // // Replace with your actual API endpoint
  // return this.http.get(`http://localhost:3000/holiday/events?holidayType=${holidayType}`);
  // }

  getEvents(holidayType: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.apiUrl}/${holidayType}`);
  }

  updateHoliday(id: string, holidayData: any): Observable<Holiday[]> {
    const url = `${this.apiUrl}/${id}`; // Add a slash (/) between apiUrl and id
    return this.http.put(url, holidayData).pipe(
      map(response => response as Holiday[])
    );
  }

  deleteHoliday(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

    // Method to get all resources to the table 
    getResources(): Observable<any> {
      return this.http.get(`${this.apiUrl}`);
    }

    //method to get resource details by id to resource calender
    getResourceDetails(resourceId: string) {
      return this.http.get(`http://localhost:3000/resources/holiday/${resourceId}`);
    }

    
}
