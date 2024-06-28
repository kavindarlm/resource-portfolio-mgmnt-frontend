import { Component } from '@angular/core';
import { ApiService } from '../../Project-management/service/api.service';
import { taskApiService } from '../services/taskApi.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { datamodel } from '../../Project-management/create-project/modelproject';

@Component({
  selector: 'app-task-project-view',
  templateUrl: './task-project-view.component.html',
  styleUrl: './task-project-view.component.css',
})
export class TaskProjectViewComponent {
  projectlist: datamodel[] | undefined;
  filteredProjects: datamodel[] = [];
  resourceNames: { [key: string]: string } = {};
  projectProgress: { [key: string]: number } = {};
  Seachtext!: string;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private projectService: ApiService,
    private taskApiService: taskApiService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getProjectList();
  }

  getProjectList() {
    this.projectService.getProjectList().subscribe((res) => {
      this.spinner.show();
      this.projectlist = res;
      this.filteredProjects = res;
      this.spinner.hide();
      this.totalPages = Math.ceil(
        this.filteredProjects.length / this.itemsPerPage
      );
      this.projectlist?.forEach((project) => {
        if (project.deliveryManager_id) {
          this.getResourceName(project.deliveryManager_id);
        }
        if (project.projectManager_id) {
          this.getResourceName(project.projectManager_id);
        }
        if (project.projectid) {
          this.getProjectProgrresById(project.projectid);
        }
      });
    });
  }

  getResourceName(resourceId: string) {
    this.taskApiService
      .getResourceNameByResourceId(resourceId)
      .subscribe((res) => {
        if (res && res.resourceId) {
          this.resourceNames[res.resourceId] = res.resourceName;
        }
      });
  }

  getCriticalityName(criticality_id: string | number) {
    if (criticality_id === 3) {
      return 'Low';
    } else if (criticality_id === 2) {
      return 'Medium';
    } else if (criticality_id === 1) {
      return 'High';
    } else {
      return 'Not Set';
    }
  }

  getProjectProgrresById(projectId: string) {
    this.taskApiService.getProjectProgress(projectId).subscribe((res) => {
      if (res) {
        this.projectProgress[projectId] = res;
      }
    });
  }

  getProjectStatus(projectId: string): string {
    const progress = this.projectProgress[projectId];
    if (progress === 100) {
      return 'Completed';
    } else if (progress > 0 && progress < 100) {
      return 'In Progress';
    } else {
      return 'Not Started';
    }
  }

  onSearchChange() {
    if (this.Seachtext) {
      this.filteredProjects =
        this.projectlist?.filter((project) =>
          project.projectName
            .toLowerCase()
            .includes(this.Seachtext.toLowerCase())
        ) || [];
    } else {
      this.filteredProjects = this.projectlist || [];
    }
    this.totalPages = Math.ceil(
      this.filteredProjects.length / this.itemsPerPage
    );
    this.currentPage = 1;
  }

  getPaginatedProjects() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProjects.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  onClickAddTask(projectId: string) {
    this.router.navigate(['/pages-body/TaskProjectList/projectTaskDetails/' + projectId + '/newTask/' + projectId]);
  }

  onClickNavigateTo(projectId: string) {
    this.router.navigate(['/pages-body/TaskProjectList/projectTaskDetails/' + projectId]);
  }
}
