import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarheaderServiceService {
  private headername = new BehaviorSubject<string>('');
  headername$ = this.headername.asObservable();
  constructor() { }
  setHeaderName(name:string){
    this.headername.next(name)
  }
}
