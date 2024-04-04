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
    return this.http.post('http://localhost:3000/teams',data);
}

//fetch data
getTeams(): Observable<any> {
  return this.http.get('http://localhost:3000/teams');
}

//new code - add selected resources to the table
private selectedResourcesSource = new BehaviorSubject<any[]>([]);
  selectedResources$ = this.selectedResourcesSource.asObservable();

  addSelectedResource(resource: any) {
    const currentSelectedResources = this.selectedResourcesSource.getValue();
    const index = currentSelectedResources.indexOf(resource);
    if (index === -1) {
      // If the resource is not already selected, add it
      this.selectedResourcesSource.next([...currentSelectedResources, resource]);
    } else {
      // If the resource is already selected, remove it
      const newSelectedResources = [...currentSelectedResources];
      newSelectedResources.splice(index, 1);
      this.selectedResourcesSource.next(newSelectedResources);
    }
  }
}
