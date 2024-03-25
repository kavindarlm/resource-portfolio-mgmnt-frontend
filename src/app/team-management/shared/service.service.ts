import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
//create data
  addTeam(data: any): Observable<any> {
    return this.http.post('/teams',data);
}

//fetch data
getTeams(): Observable<any> {
  return this.http.get('/teams');
}

//new code - add selected resources to the table
private selectedResourcesSource = new BehaviorSubject<any[]>([]);
  selectedResources$ = this.selectedResourcesSource.asObservable();

  addSelectedResource(resource: any) {
    const currentSelectedResources = this.selectedResourcesSource.getValue();
    this.selectedResourcesSource.next([...currentSelectedResources, resource]);
}
}
