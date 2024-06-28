import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-all-team-view',
  templateUrl: './all-team-view.component.html',
  styleUrl: './all-team-view.component.css'
})
export class AllTeamViewComponent {
  teams: any[] = [];
  filteredTeams: any[] = [];
  resourceNames: { [key: string]: string } = {};
  Seachtext!: string;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private teamService: ServiceService,  private router: Router,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getTeamList();
  }

  getTeamList(){
    this.teamService.getTeams().subscribe(res => {
      this.spinner.show();
      this.teams = res;
      this.filteredTeams = res;
      this.spinner.hide();
      this.totalPages = Math.ceil(this.filteredTeams.length / this.itemsPerPage)
    });
  }


  onSearchChange() {
    if (this.Seachtext) {
      this.filteredTeams = this.teams?.filter(teams => 
        teams.projectName.toLowerCase().includes(this.Seachtext.toLowerCase())
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

  onClick(){
  //  this.router.navigate(['/pages-body/projectlist/createproject']); 
  }

  onClickNavigateTo(projectId: string){
    // this.router.navigate(['/pages-body/projectlist/updatePoject/'+projectId]);

  }
}
