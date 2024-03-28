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
    return this.http.get<any[]>("http://localhost:3000/resources");
  }

  createResource(data: ResourceModel){
    return this.http.post<ResourceModel>("/resources",data);
  }

  // createResource(clickedResource: any) {
    
  //   console.log(clickedResource);
  //   return this.http.post<any>("/resources", clickedResource).subscribe((res: any) => {
  //     alert(res.message);
  //   });
  //   alert("Resource was added.");
  // }
// 
  // createResource(data: add-form){

  // }

  // updateResource(id: string, resourceData: any): Observable<any> {
  //   return this.http.put<any>(`http://localhost:3000/resources/${id}`, resourceData);
  // }

  // deleteResource(id: string): Observable<any> {
  //   return this.http.delete<any>(`http://localhost:3000/resources/${id}`);
  // }

}

