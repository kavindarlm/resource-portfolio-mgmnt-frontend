// resource.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceModel } from '../../resourceMgt/add-form/addformmodel';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  clickedResource: any[]=[];

  constructor(private http: HttpClient) { }

  setData(data: any[]) {
    this.clickedResource = data;
  }

  getData(): any[] {
    return this.clickedResource;
  }

  getResources() {
    return this.http.get<ResourceModel[]>("http://localhost:3000/resource");
  }

  createResource(data: ResourceModel){
    return this.http.post<ResourceModel>("http://localhost:3000/resource",data);
  }


  updateResource(id: string, resourceData: ResourceModel) {
    return this.http.put<ResourceModel>("http://localhost:3000/resource/"+id, resourceData);
  }

  // deleteResource(id: string): Observable<any> {
  //   return this.http.delete<any>(`http://localhost:3000/resources/${id}`);
  // }

}

