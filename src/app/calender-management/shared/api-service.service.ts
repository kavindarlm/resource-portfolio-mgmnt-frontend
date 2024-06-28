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

  //get holiday by holiday type
  getEvents(holidayType: string): Observable<Holiday[]> {
    const url = `${this.apiUrl}/${holidayType}`;
    return this.http.get<Holiday[]>(url);
  }

  //get the resource holidays by resourceId
  resourceGetEvents(resourceId: string) {
    const url = `http://localhost:3000/resource-holiday/${resourceId}`;
    return this.http.get<any>(url);
  }

  //update global holidays
  updateHoliday(id: string, holidayData: any): Observable<Holiday[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, holidayData).pipe(
      map(response => response as Holiday[])
    );
  }

  //delete global holidays
  deleteHoliday(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  deleteResourceHoliday(holy_id: string): Observable<any> {
    const url = `${this.apiUrl}/resource-holiday/${holy_id}`;
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

  isTodayAHoliday(): Observable<{ isHoliday: boolean }> {
    return this.http.get<{ isHoliday: boolean }>(`${this.apiUrl}/is-today-holiday`);
  }

  getCountOfResourcesWithHolidayToday(): Observable<number> {
    return this.http.get<number>(`http://localhost:3000/resource-holiday/count/today`);
  }


}
