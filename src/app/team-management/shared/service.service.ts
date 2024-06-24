import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Resource } from '../team-form/team-form.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }
  //create data
  addTeam(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/teams', data);
  }

  //fetch data
  getTeams(): Observable<any> {
    return this.http.get('http://localhost:3000/teams');
  }

  //new code - add selected resources to the table
  private selectedResourcesSource = new BehaviorSubject<any[]>([]);
  selectedResources$ = this.selectedResourcesSource.asObservable();

  addSelectedResource(resource: Resource) {
    const currentSelectedResources = this.selectedResourcesSource.getValue();
    const index = currentSelectedResources.findIndex(selectedResource => selectedResource.resourceId === resource.resourceId);

    if (index === -1) {
      this.selectedResourcesSource.next([...currentSelectedResources, resource]);
      resource.isSelected = true;
    } else {
      const newSelectedResources = [...currentSelectedResources];
      newSelectedResources.splice(index, 1);
      this.selectedResourcesSource.next(newSelectedResources);
      resource.isSelected = false;
    }
  }
}
