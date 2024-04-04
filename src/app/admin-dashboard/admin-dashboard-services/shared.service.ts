import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private functionIdsSource = new BehaviorSubject<number[]>([]);
  functionIds$ = this.functionIdsSource.asObservable();

  updateFunctionIds(ids: number[]) {
    this.functionIdsSource.next(ids);
  }
}