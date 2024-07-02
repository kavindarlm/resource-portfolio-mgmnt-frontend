// resource.service.ts
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ResourceModel } from '../../resourceMgt/add-form/addformmodel';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  clickedResource: any[] = [];
  resourceListUpdated = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  setData(data: any[]) {
    this.clickedResource = data;
  }

  getData(): any[] {
    return this.clickedResource;
  }

  //To get resources
  getResources() {
    return this.http.get<ResourceModel[]>("http://localhost:3000/resource");
  }

  //To get resource by id
  getResource(id: string) {
    return this.http.get<ResourceModel>(`http://localhost:3000/resource/${id}`);
  }

  //To create resource
  createResource(data: ResourceModel) {
    return this.http.post<ResourceModel>("http://localhost:3000/resource", data);
  }

  //To update a resource
  updateResource(id: string, resourceData: ResourceModel) {
    return this.http.put<ResourceModel>("http://localhost:3000/resource/" + id, resourceData);
  }

  //To delete a resource
  deleteResource(id: string): Observable<any> {
    return this.http.delete<any>("http://localhost:3000/resource/" + id);
  }

  //To get job role name
  getRoleName(roleId: number): Observable<string> {
    console.log(roleId);
    return this.http.get<string>(`http://localhost:3000/job-role/${roleId}`)
      .pipe(
        tap(roleName => console.log('Role Name:', roleName)),
        catchError(error => {
          console.error('Error fetching role name2:', error);
          return throwError(error);
        })
      );
  }

  //To get org unit name
  getUnitName(unitId: number): Observable<string> {
    return this.http.get<string>(`http://localhost:3000/org-unit/${unitId}`)
      .pipe(
        tap(unitName => console.log('Unit Name:', unitName)),
        catchError(error => {
          console.error('Error fetching unit name:', error);
          return throwError(error);
        })
      );
  }


}

