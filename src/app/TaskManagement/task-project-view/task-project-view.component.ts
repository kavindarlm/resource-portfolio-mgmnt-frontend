import { Component } from '@angular/core';
import { ApiService } from '../../Project-management/service/api.service';
import { taskApiService } from '../services/taskApi.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { datamodel } from '../../Project-management/create-project/modelproject';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-project-view',
  templateUrl: './task-project-view.component.html',
  styleUrls: ['./task-project-view.component.css'],
})
export class TaskProjectViewComponent {
  projectlist: datamodel[] | undefined;
  filteredProjects: datamodel[] = [];
  resourceNames: { [key: string]: string } = {};
  projectProgress: { [key: string]: number } = {};
  searchText!: string;
  selectedStatus: string = '';

  // Sorting properties
  sortProgressState: number = 0; // 0 = no sorting, 1 = ascending, 2 = descending
  sortProjectNameState: number = 0; // 0 = no sorting, 1 = A-Z, 2 = Z-A
  sortDeliveryManagerState: number = 0; // 0 = no sorting, 1 = A-Z, 2 = Z-A

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private projectService: ApiService,
    private taskApiService: taskApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private refreshData: SidebarheaderServiceService,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.refreshData.refreshSystem$.subscribe(() => {
      this.getProjectList();
    });
    this.getProjectList();
  }

  getProjectList() {
    this.spinner.show();
    this.projectService.getProjectList().subscribe({
      next: (res) => {
        this.projectlist = res;
        this.filteredProjects = res;
        this.totalPages = Math.ceil(this.filteredProjects.length / this.itemsPerPage);
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
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toster.error('Failed to load projects. Please try again later.', 'Error');
      }
    });
  }

  getResourceName(resourceId: string) {
    this.taskApiService.getResourceNameByResourceId(resourceId).subscribe({
      next: (res) => {
        if (res && res.resourceId) {
          this.resourceNames[res.resourceId] = res.resourceName;
        }
      },
      error: (error) => {
        this.toster.error('Failed to load resource name. Please try again later.', 'Error');
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
        this.onFilterChange();
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
    this.onFilterChange();
  }

  onStatusChange() {
    this.onFilterChange();
  }

  onFilterChange() {
    let filtered = this.projectlist || [];
    if (this.searchText) {
      filtered = filtered.filter((project) =>
        project.projectName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    if (this.selectedStatus) {
      filtered = filtered.filter((project) =>
        this.getProjectStatus(project.projectid) === this.selectedStatus
      );
    }

    if (this.sortProgressState !== 0) {
      filtered = filtered.sort((a, b) => {
        const progressA = this.projectProgress[a.projectid] || 0;
        const progressB = this.projectProgress[b.projectid] || 0;
        if (this.sortProgressState === 1) {
          return progressA - progressB; // ascending
        } else {
          return progressB - progressA; // descending
        }
      });
    }

    if (this.sortProjectNameState !== 0) {
      filtered = filtered.sort((a, b) => {
        const nameA = a.projectName.toLowerCase();
        const nameB = b.projectName.toLowerCase();
        if (this.sortProjectNameState === 1) {
          return nameA.localeCompare(nameB); // A-Z
        } else {
          return nameB.localeCompare(nameA); // Z-A
        }
      });
    }

    if (this.sortDeliveryManagerState !== 0) {
      filtered = filtered.sort((a, b) => {
        const nameA = this.resourceNames[a.deliveryManager_id]?.toLowerCase() || '';
        const nameB = this.resourceNames[b.deliveryManager_id]?.toLowerCase() || '';
        if (this.sortDeliveryManagerState === 1) {
          return nameA.localeCompare(nameB); // A-Z
        } else {
          return nameB.localeCompare(nameA); // Z-A
        }
      });
    }

    this.filteredProjects = filtered;
    this.totalPages = Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  toggleProgressSort() {
    this.sortProgressState = (this.sortProgressState + 1) % 3;
    this.onFilterChange();
  }

  toggleProjectNameSort() {
    this.sortProjectNameState = (this.sortProjectNameState + 1) % 3;
    this.onFilterChange();
  }

  toggleDeliveryManagerSort() {
    this.sortDeliveryManagerState = (this.sortDeliveryManagerState + 1) % 3;
    this.onFilterChange();
  }

  getPaginatedProjects() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProjects.slice(startIndex, startIndex + this.itemsPerPage);
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
