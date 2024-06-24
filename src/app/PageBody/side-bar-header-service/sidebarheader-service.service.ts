// sidebarheader-service.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarheaderServiceService {
  private headerNameKey = 'selectedHeaderName';
  private headerNameSubject = new BehaviorSubject<string>('');
  constructor() {
    const storedHeaderName = localStorage.getItem(this.headerNameKey);
    if (storedHeaderName) {
      this.headerNameSubject.next(storedHeaderName);
    }
  }
  getHeaderName() {
    return this.headerNameSubject.asObservable();
  }
  setHeaderName(name: string) {
    localStorage.setItem(this.headerNameKey, name);
    this.headerNameSubject.next(name);
  }

  //This method for sidebar active when click the button
  private sidebarActive = new BehaviorSubject<void>(undefined);
  sidebarActive$ = this.sidebarActive.asObservable();

  setSidebarActive() {
    this.sidebarActive.next();
  }

  private EditpasswordVisible = new BehaviorSubject<boolean>(false);
  EditpasswordVisible$ = this.EditpasswordVisible.asObservable();

  showEditPasswardComponent() {
    this.EditpasswordVisible.next(true);
  }

  hideEditPasswardComponent() {
    this.EditpasswordVisible.next(false);
  }

  toggleEditPasswardComponent() {
    this.EditpasswordVisible.next(!this.EditpasswordVisible.value);
  }

  private logoutSubject = new Subject<void>();

  logout() {
    this.logoutSubject.next();
  }

  getLogoutEvent() {
    return this.logoutSubject.asObservable();
  }

  clearHeaderName() {
    localStorage.removeItem(this.headerNameKey);
    this.headerNameSubject.next('');
  }
}
