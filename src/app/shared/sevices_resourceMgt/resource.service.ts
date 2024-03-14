// resource.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  clickedResource: any[]=[];

  constructor() { }

  setData(data: any[]) {
    this.clickedResource = data;
  }

  getData(): any[] {
    return this.clickedResource;
  }

}
