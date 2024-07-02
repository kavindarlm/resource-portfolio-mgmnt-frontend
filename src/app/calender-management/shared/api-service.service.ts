import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { Holiday } from '../calender.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private apiUrl = environment.baseUrl // Global base URL

  constructor(private http: HttpClient) { }

  // post public,bank,mercantile holidays to all resourceIds
  addEvent(selectedDates: NgbDate[], holidayType: string): Observable<any> {
    const event = { selectedDates, holidayType };
    return this.http.post(`${this.apiUrl}/holiday`, event);
  }

  // new api to post resource holiday use if only if it is a holiday type of resource
  resourceAddEvent(selectedDates: NgbDate[], holidayType: string, resourceIds: string[]): Observable<any> {
    const event = {
      selectedDates: selectedDates.map(date => ({ year: date.year, month: date.month, day: date.day })),
      holidayType,
      resourceIds
    };
    return this.http.post(`${this.apiUrl}/holiday/resource`, event);
  }

  // get holiday by holiday type
  getEvents(holidayType: string): Observable<Holiday[]> {
    const url = `${this.apiUrl}/holiday/${holidayType}`;
    return this.http.get<Holiday[]>(url);
  }

  // get the resource holidays by resourceId
  resourceGetEvents(resourceId: string): Observable<any> {
    const url = `${this.apiUrl}/resource-holiday/${resourceId}`;
    return this.http.get<any>(url);
  }

  // update global holidays
  updateHoliday(id: string, holidayData: any): Observable<Holiday[]> {
    const url = `${this.apiUrl}/holiday/${id}`;
    return this.http.put(url, holidayData).pipe(
      map(response => response as Holiday[])
    );
  }

  // delete global holidays
  deleteHoliday(id: string): Observable<any> {
    const url = `${this.apiUrl}/holiday/${id}`;
    return this.http.delete(url);
  }

  deleteResourceHoliday(holy_id: string): Observable<any> {
    const url = `${this.apiUrl}/holiday/resource-holiday/${holy_id}`;
    return this.http.delete(url);
  }

  // Method to get all resources to the table 
  getResources(): Observable<any> {
    return this.http.get(`${this.apiUrl}/holiday`);
  }

  // method to get resource details by id to resource calendar
  getResourceDetails(resourceId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/resource/holiday/${resourceId}`);
  }

  isTodayAHoliday(): Observable<{ isHoliday: boolean }> {
    return this.http.get<{ isHoliday: boolean }>(`${this.apiUrl}/holiday/is-today-holiday`);
  }

  getCountOfResourcesWithHolidayToday(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/resource-holiday/count/today`);
  }

}
