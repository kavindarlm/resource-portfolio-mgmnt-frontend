import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../dashboard-model/userModel';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // This service is used to share functionId between components
  private functionIdsSource = new BehaviorSubject<number[]>([]);
  functionIds$ = this.functionIdsSource.asObservable();

  updateFunctionIds(ids: number[]) {
    this.functionIdsSource.next(ids);
  }

  // This service is used to refresh the user list after adding a new user
  private refreshUserListSource = new BehaviorSubject<void>(undefined);
  refreshUserList$ = this.refreshUserListSource.asObservable();

  refreshUserList() {
    this.refreshUserListSource.next();
  }

  // This service is used to refresh the user details after updating a user
  private refreshUserSource = new BehaviorSubject<number | null>(null);
  refreshUser$ = this.refreshUserSource.asObservable();

  refreshUser(userId: number) {
    this.refreshUserSource.next(userId);
  }
  
}