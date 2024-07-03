import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../shared/service.service';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-all-team-view',
  templateUrl: './all-team-view.component.html',
  styleUrl: './all-team-view.component.css',
})
export class AllTeamViewComponent {
  teams: any[] = [];
  filteredTeams: any[] = [];
  resourceNames: { [key: string]: string } = {};
  searchText!: string;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private teamService: ServiceService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private refreshData: SidebarheaderServiceService
  ) {}

  ngOnInit(): void {
    // Subscribe to the refreshSystem event
    this.refreshData.refreshSystem$.subscribe(() => {
      this.getTeamList();
    });
    this.getTeamList();
  }

  getTeamList() {
    this.spinner.show();
    this.teamService.getTeams().subscribe((res) => {
      this.teams = res;
      this.filteredTeams = res;
      this.totalPages = Math.ceil(
        this.filteredTeams.length / this.itemsPerPage
      );
    });
    this.spinner.hide();
  }

  onSearchChange() {
    if (this.searchText) {
      this.filteredTeams = this.teams?.filter((team) =>
        team.teamName.toLowerCase().includes(this.searchText.toLowerCase())
      ) || [];
    } else {
      this.filteredTeams = this.teams || [];
    }
    this.totalPages = Math.ceil(this.filteredTeams.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  getPaginatedTeams() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTeams.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  onClick() {
    this.router.navigate(['/pages-body/teamlistcomponent']);
  }

  onClickNavigateTo(teamId: number) {
    this.router.navigate(['/pages-body/teamlistcomponent/update/' + teamId]);
  }
}
