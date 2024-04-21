import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'] 
})
export class TeamListComponent implements OnInit {
  teams: any[] = [];
  showForm = false;
  showUpdate = false;
  searchtext: any;
  errorMessage: string = ''; // Define the errorMessage property

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.fetchTeamList();
  }

  //method to fetch the team list
  fetchTeamList() {
    this.service.getTeams().pipe(
      catchError((err: any) => {
        console.error('An error occurred while fetching teams:', err);
        // Set the error message when there's an error
        this.errorMessage = 'An error occurred while fetching the teams. Please try again later.';
        return of([]); 
      })
    ).subscribe({
      next: (res: any) => {
        this.teams = res; 
        this.errorMessage = ''; // Clear the error message when the request is successful
      }
    });
  }
}