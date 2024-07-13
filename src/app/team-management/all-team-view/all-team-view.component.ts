import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../shared/service.service';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-all-team-view',
  templateUrl: './all-team-view.component.html',
  styleUrls: ['./all-team-view.component.css'],
})
export class AllTeamViewComponent implements OnInit {
  teams: any[] = [];
  filteredTeams: any[] = [];
  searchText!: string;

  // Sorting properties
  sortStateTeamName: number = 0; // 0: No sort, 1: Ascending, 2: Descending
  sortStateResourceCount: number = 0; // 0: No sort, 1: Ascending, 2: Descending

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
      this.spinner.hide();
    });
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
    let sortedTeams = this.filteredTeams;

    // Sort by Team Name
    if (this.sortStateTeamName === 1) {
      sortedTeams = sortedTeams.sort((a, b) =>
        a.teamName.localeCompare(b.teamName)
      );
    } else if (this.sortStateTeamName === 2) {
      sortedTeams = sortedTeams.sort((a, b) =>
        b.teamName.localeCompare(a.teamName)
      );
    }

    // Sort by Number of Resources
    if (this.sortStateResourceCount === 1) {
      sortedTeams = sortedTeams.sort((a, b) => a.resourceCount - b.resourceCount);
    } else if (this.sortStateResourceCount === 2) {
      sortedTeams = sortedTeams.sort((a, b) => b.resourceCount - a.resourceCount);
    }

    return sortedTeams.slice(startIndex, startIndex + this.itemsPerPage);
  }

  toggleSort(field: string) {
    switch (field) {
      case 'teamName':
        this.sortStateTeamName = (this.sortStateTeamName + 1) % 3;
        if (this.sortStateTeamName === 1) {
          this.sortStateResourceCount = 0;
        }
        break;
      case 'resourceCount':
        this.sortStateResourceCount = (this.sortStateResourceCount + 1) % 3;
        if (this.sortStateResourceCount === 1) {
          this.sortStateTeamName = 0;
        }
        break;
      default:
        break;
    }
    this.currentPage = 1; // Reset to first page after sorting change
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
