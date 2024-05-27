import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  // Define the properties
  showDialog = false;

  constructor() { }

  //This service for refreshing the team list after adding a new team
  private refreshTeamListSource = new BehaviorSubject<void>(undefined);
  refreshTeamList$ = this.refreshTeamListSource.asObservable();

  refreshTeamList() {
    this.refreshTeamListSource.next();
  }
}
