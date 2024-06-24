import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private isSmallScreen = new BehaviorSubject<boolean>(window.innerWidth < 768);
  isSmallScreen$ = this.isSmallScreen.asObservable();

  constructor() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  private onResize() {
    this.isSmallScreen.next(window.innerWidth < 768);
  }
}
