import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../dashboard-model/userModel';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // This service is used to share functionId between components
  private functionIds1!: number[];
  user_id!: number;

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

  //this is used to when click new user button in user list load the new function list button
  private _isAddNewUserClicked = new BehaviorSubject<boolean>(false);
  isAddNewUserClicked$ = this._isAddNewUserClicked.asObservable();

  setAddNewUserClicked(isClicked: boolean) {
    this._isAddNewUserClicked.next(isClicked);
  }

  //this is used to set and get functionIds of defferent user in function management component into function button component
  private functionIds1Subject = new BehaviorSubject<number[]>([]);
  functionIds1$ = this.functionIds1Subject.asObservable();

  setFunctionIds1(ids: number[]) {
    this.setAddNewUserClicked(false);
    this.functionIds1Subject.next(ids);
  }

  getFunctionIds1(): number[] {
    return this.functionIds1 || [];
  }

}