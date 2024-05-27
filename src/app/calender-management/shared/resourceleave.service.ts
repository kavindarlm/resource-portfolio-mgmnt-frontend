import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceleaveService {

  constructor() { }

private clickedResourceSource = new BehaviorSubject<any>(null);
clickedResource = this.clickedResourceSource.asObservable();

setData(data: any) {
  this.clickedResourceSource.next(data);
}


}
