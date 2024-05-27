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

  // post public,bank,mercantile hoildays to all resourceIds
  addEvent(selectedDates: NgbDate[], holidayType: string): Observable<any> {
    const event = { selectedDates, holidayType };
    return this.http.post(this.apiUrl, event);
  }

  //new api to post resource holiday use if only if it is a holiday type of resource
  resourceAddEvent(selectedDates: NgbDate[], holidayType: string, resourceIds: string[]): Observable<any> {
    const event = {
      selectedDates: selectedDates.map(date => ({ year: date.year, month: date.month, day: date.day })),
      holidayType,
      resourceIds
    };
    return this.http.post(`${this.apiUrl}/resource`, event);
  }

  // In api-service.service.ts
  // getEvents(holidayType: string) {
  // // Replace with your actual API endpoint
  // return this.http.get(`http://localhost:3000/holiday/events?holidayType=${holidayType}`);
  // }

  // getEvents(holidayType: string): Observable<Holiday[]> {
  //   return this.http.get<Holiday[]>(`${this.apiUrl}/${holidayType}`);
  // }

  getEvents(holidayType: string): Observable<Holiday[]> {
    const url = `${this.apiUrl}/${holidayType}`;
    return this.http.get<Holiday[]>(url);
  }
  
// api-service.service.ts
resourceGetEvents(holidayType: string, resourceId: string) {
  const url = `${this.apiUrl}/${holidayType}?resourceId=${resourceId}`;
  return this.http.get<any>(url); // Change this to any
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
      return this.http.get(`http://localhost:3000/resource/holiday/${resourceId}`);
    }

    
}
