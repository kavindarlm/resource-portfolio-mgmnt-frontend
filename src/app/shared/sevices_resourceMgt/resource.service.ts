import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ResourceModel } from '../../resourceMgt/add-form/addformmodel';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private baseUrl = environment.baseUrl; // Global base URL
  clickedResource: any[]=[];
  resourceListUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  setData(data: any[]) {
    this.clickedResource = data;
  }

  getData(): any[] {
    return this.clickedResource;
  }

  getResources() {
    return this.http.get<ResourceModel[]>(`${this.baseUrl}/resource`);
  }

  getResource(id: string) {
    return this.http.get<ResourceModel>(`${this.baseUrl}/resource/${id}`);
  }

  createResource(data: ResourceModel){
    return this.http.post<ResourceModel>(`${this.baseUrl}/resource`, data);
  }

  updateResource(id: string, resourceData: ResourceModel) {
    return this.http.put<ResourceModel>(`${this.baseUrl}/resource/${id}`, resourceData);
  }

  deleteResource(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/resource/${id}`);
  }

  getRoleName(roleId: number): Observable<string> {
    console.log(roleId);
    return this.http.get<string>(`${this.baseUrl}/job-role/${roleId}`)
      .pipe(
        tap(roleName => console.log('Role Name:', roleName)),
        catchError(error => {
          console.error('Error fetching role name:', error);
          return throwError(error);
        })
      );
  }
  
  getUnitName(unitId: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/org-unit/${unitId}`)
      .pipe(
        tap(unitName => console.log('Unit Name:', unitName)),
        catchError(error => {
          console.error('Error fetching unit name:', error);
          return throwError(error);
        })
      );
  }
}