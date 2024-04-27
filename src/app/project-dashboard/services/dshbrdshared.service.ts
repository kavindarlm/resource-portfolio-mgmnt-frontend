import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashbrdSharedService {

  private viewMoreSource = new BehaviorSubject<boolean>(false);
  viewMore$ = this.viewMoreSource.asObservable();

  setViewMore(value: boolean) {
    this.viewMoreSource.next(value);
  }
}