import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Resource } from '../team-form/team-form.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = environment.baseUrl; // Base URL global variable

  constructor(private http: HttpClient) { }

  // Create data
  addTeam(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/teams`, data);
  }

  // Fetch data
  getTeams(): Observable<any> {
    return this.http.get(`${this.baseUrl}/teams`);
  }

  // New code - add selected resources to the table
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