import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { catchError } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from '../shared/general.service';

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
  private refreshTeam! : Subscription;

  constructor(private service: ServiceService,
    private spineer: NgxSpinnerService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.refreshTeam = this.generalService.refreshTeamList$.subscribe(() => {
    this.fetchTeamList();
    });
  }

  //method to fetch the team list
  fetchTeamList() {
    this.spineer.show();
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
        this.spineer.hide();
      }
    });
  }
}