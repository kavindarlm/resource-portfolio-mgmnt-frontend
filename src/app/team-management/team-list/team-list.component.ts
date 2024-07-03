import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { catchError } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from '../shared/general.service';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {
  teams: any[] = [];
  filteredTeams: any[] = [];
  showForm = false;
  showUpdate = false;
  _searchtext: string = '';
  errorMessage: string = ''; // Define the errorMessage property
  private refreshTeam!: Subscription;

  get searchtext(): string {
    return this._searchtext;
  }

  set searchtext(value: string) {
    this._searchtext = value;
    this.filteredTeams = this.filterTeams(value); // set the filteredTeams whenever the searchtext changes
  }

  constructor(
    private service: ServiceService,
    private spinner: NgxSpinnerService,
    private generalService: GeneralService,
    private refreshData: SidebarheaderServiceService
  ) {}

  ngOnInit(): void {
    this.refreshTeam = this.generalService.refreshTeamList$.subscribe(() => {
      this.fetchTeamList();
    });

    // Refresh System
    this.refreshData.refreshSystem$.subscribe(() => {
      this.fetchTeamList();
    });

    // Initial fetch
    this.fetchTeamList();
  }

  ngOnDestroy(): void {
    if (this.refreshTeam) {
      this.refreshTeam.unsubscribe();
    }
  }

  filterTeams(searchString: string) {
    if (!searchString) {
      return this.teams;
    }

    return this.teams.filter(team =>
      team.teamName && team.teamName.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  // Method to fetch the team list
  fetchTeamList() {
    this.spinner.show();
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
        this.filteredTeams = this.filterTeams(this.searchtext); // set the filteredTeams when the teams are fetched
        this.errorMessage = ''; // Clear the error message when the request is successful
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      }
    });
  }
}
