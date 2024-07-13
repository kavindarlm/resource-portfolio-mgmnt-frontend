import { Component, OnInit } from '@angular/core';
import { projectDataModel } from '../projct-dshbrd-model/dshbrd-project';
import { ProjectDashboardService } from '../services/projectDashboard.service';
import { DashbrdSharedService } from '../services/dshbrdshared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

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
  selectedProgress: string = '';
  error: any;

  constructor(private projectDashboardServicee: ProjectDashboardService, private sharedService: DashbrdSharedService, private spinner: NgxSpinnerService, private refreshData: SidebarheaderServiceService) {
    this.sharedService.viewMore$.subscribe(value => {
      this.isViewMoreClicked = value;
      this.currentPage = 1;
      this.itemsPerPage = 8;
    });
  }

  get totalPages() {
    return this.projectdata ? Math.ceil(this.getFilteredProjects().length / this.itemsPerPage) : 0;
  }

  ngOnInit(): void {
    this.refreshData.refreshSystem$.subscribe(() => {
      this.getAllprojects();
    });
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

  onProgressChange() {
    // Update the project list based on the selected progress filter
    this.getFilteredProjects();
  }

  getFilteredProjects() {
    let filteredProjects = this.projectdata;

    if (this.selectedProgress) {
      filteredProjects = filteredProjects.filter(project => {
        const progressStatus = this.getProjectProgressStatus(project.projectid);
        return progressStatus === this.selectedProgress;
      });
    }

    return filteredProjects;
  }

  getProjectProgressStatus(projectId: string): string {
    const progress = this.progress[projectId];
    if (progress === 100) {
      return 'Completed';
    } else if (progress > 0 && progress < 100) {
      return 'In Progress';
    } else {
      return 'Not Started';
    }
  }
}
