import { Component, OnInit } from '@angular/core';
import { projectDataModel } from '../projct-dshbrd-model/dshbrd-project';
import { ProjectDashboardService } from '../services/projectDashboard.service';
import { DashbrdSharedService } from '../services/dshbrdshared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-dashbrd-project-list',
  templateUrl: './dashbrd-project-list.component.html',
  styleUrls: ['./dashbrd-project-list.component.css']
})
export class DashbrdProjectListComponent implements OnInit {

  projectdata: projectDataModel[] = [];
  progress: { [key: string]: number } = {};
  isViewMoreClicked = false;
  currentPage = 1;
  itemsPerPage = 8;
  searchText: string = '';
  selectedCriticality: string = '';
  error: any;

  constructor(private projectDashboardServicee: ProjectDashboardService, private sharedService: DashbrdSharedService, private spinner: NgxSpinnerService) {
    this.sharedService.viewMore$.subscribe(value => {
      this.isViewMoreClicked = value;
      this.currentPage = 1;
      this.itemsPerPage = 8;
    });
  }

  get totalPages() {
    return this.projectdata ? Math.ceil(this.projectdata.length / this.itemsPerPage) : 0;
  }

  ngOnInit(): void {
    this.getAllprojects();
  }

  viewMore() {
    this.isViewMoreClicked = true;
    this.itemsPerPage = 4;
  }

  getAllprojects() {
    try {
      this.spinner.show();
      this.projectDashboardServicee.getAllProject().subscribe((data: projectDataModel[]) => {
        this.projectdata = data;
        this.projectdata.forEach(project => {
          this.getProjectProgress(project.projectid);
        });
        this.spinner.hide();
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  getCriticalityClass(criticality_id: number) {
    switch (criticality_id) {
      case 1: return 'High';
      case 2: return 'Medium';
      case 3: return 'Low';
      default: return '';
    }
  }

  getProjectProgress(projectid: string) {
    this.projectDashboardServicee.fetchProjectProgress(projectid).subscribe((data) => {
      this.progress[projectid] = data as number;
    });
  }

  onSearchChange() {
    this.projectDashboardServicee.searchProject(this.searchText).pipe(
      catchError(error => {
        this.error = error;
        return [];
      })
    ).subscribe((res: projectDataModel[]) => {
      this.projectdata = res;
    });
  }

  onCriticalityChange() {
    if (this.selectedCriticality) {
      this.projectDashboardServicee.filterProjectByCriticality(this.selectedCriticality).pipe(
        catchError(error => {
          this.error = error;
          return [];
        })
      ).subscribe((res: projectDataModel[]) => {
        this.projectdata = res;
        this.projectdata.forEach(project => {
          this.getProjectProgress(project.projectid);
        });
      });
    } else {
      this.getAllprojects(); // If no criticality selected, get all projects
    }
  }
}
