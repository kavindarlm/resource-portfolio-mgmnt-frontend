import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { datamodel } from '../create-project/modelproject';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { ResourceNameandId } from '../../TaskManagement/dataModels/projectModel';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects-view',
  templateUrl: './projects-view.component.html',
  styleUrls: ['./projects-view.component.css'],
})
export class ProjectsViewComponent implements OnInit {
  projectlist: datamodel[] = [];
  filteredProjects: datamodel[] = [];
  resourceNames: { [key: string]: string } = {};
  Seachtext!: string;

  // Sorting properties
  sortState: number = 0; // 0 = no sorting, 1 = ascending, 2 = descending
  sortStateStartDate: number = 0;
  sortStateEndDate: number = 0;
  sortStateDeliveryManager: number = 0;
  sortStateProjectManager: number = 0;

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
    this.getProjectList();
    this.refreshData.refreshSystem$.subscribe(() => {
      this.getProjectList();
    });
  }

  // Get all projects
  getProjectList() {
    this.spinner.show();
    this.projectService.getProjectList().subscribe({
      next: (res) => {
        this.projectlist = res;
        this.filteredProjects = res;
        this.totalPages = Math.ceil(
          this.filteredProjects.length / this.itemsPerPage
        );
        this.projectlist.forEach((project) => {
          if (project.deliveryManager_id) {
            this.getResourceName(project.deliveryManager_id);
          }
          if (project.projectManager_id) {
            this.getResourceName(project.projectManager_id);
          }
        });
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toster.error(error, 'Error');
      },
    });
  }

  // Get resource name by resource id
  getResourceName(resourceId: string) {
    this.taskApiService
      .getResourceNameByResourceId(resourceId)
      .subscribe((res) => {
        if (res && res.resourceId) {
          this.resourceNames[res.resourceId] = res.resourceName;
        }
      });
  }

  // Get criticality name by criticality id
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

  // Get paginated projects
  getPaginatedProjects() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let sortedProjects = this.filteredProjects;

    // Sort by Project Name
    if (this.sortState === 1) {
      sortedProjects = sortedProjects.sort((a, b) =>
        a.projectName.localeCompare(b.projectName)
      );
    } else if (this.sortState === 2) {
      sortedProjects = sortedProjects.sort((a, b) =>
        b.projectName.localeCompare(a.projectName)
      );
    }

    // Sort by Project Start Date
    if (this.sortStateStartDate === 1) {
      sortedProjects = sortedProjects.sort((a, b) =>
        new Date(a.projectStartDate).getTime() -
        new Date(b.projectStartDate).getTime()
      );
    } else if (this.sortStateStartDate === 2) {
      sortedProjects = sortedProjects.sort((a, b) =>
        new Date(b.projectStartDate).getTime() -
        new Date(a.projectStartDate).getTime()
      );
    }

    // Sort by Project End Date
    if (this.sortStateEndDate === 1) {
      sortedProjects = sortedProjects.sort((a, b) =>
        new Date(a.projectEndDate).getTime() -
        new Date(b.projectEndDate).getTime()
      );
    } else if (this.sortStateEndDate === 2) {
      sortedProjects = sortedProjects.sort((a, b) =>
        new Date(b.projectEndDate).getTime() -
        new Date(a.projectEndDate).getTime()
      );
    }

    // Sort by Delivery Manager
    if (this.sortStateDeliveryManager === 1) {
      sortedProjects = sortedProjects.sort((a, b) =>
        this.resourceNames[a.deliveryManager_id]?.localeCompare(this.resourceNames[b.deliveryManager_id])
      );
    } else if (this.sortStateDeliveryManager === 2) {
      sortedProjects = sortedProjects.sort((a, b) =>
        this.resourceNames[b.deliveryManager_id]?.localeCompare(this.resourceNames[a.deliveryManager_id])
      );
    }

    // Sort by Project Manager
    if (this.sortStateProjectManager === 1) {
      sortedProjects = sortedProjects.sort((a, b) =>
        this.resourceNames[a.projectManager_id]?.localeCompare(this.resourceNames[b.projectManager_id])
      );
    } else if (this.sortStateProjectManager === 2) {
      sortedProjects = sortedProjects.sort((a, b) =>
        this.resourceNames[b.projectManager_id]?.localeCompare(this.resourceNames[a.projectManager_id])
      );
    }

    return sortedProjects.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Change page
  changePage(page: number) {
    this.currentPage = page;
  }

  // Toggle sorting
  toggleSort(field: string) {
    switch (field) {
      case 'projectName':
        this.sortState = (this.sortState + 1) % 3;
        break;
      case 'projectStartDate':
        this.sortStateStartDate = (this.sortStateStartDate + 1) % 3;
        break;
      case 'projectEndDate':
        this.sortStateEndDate = (this.sortStateEndDate + 1) % 3;
        break;
      case 'deliveryManager_id':
        this.sortStateDeliveryManager = (this.sortStateDeliveryManager + 1) % 3;
        break;
      case 'projectManager_id':
        this.sortStateProjectManager = (this.sortStateProjectManager + 1) % 3;
        break;
      default:
        break;
    }
    this.currentPage = 1; // Reset to first page after sorting change
    this.onSearchChange(); // Reapply search filter if active
  }

  // Search filter
  onSearchChange() {
    if (this.Seachtext) {
      this.filteredProjects =
        this.projectlist.filter((project) =>
          project.projectName
            .toLowerCase()
            .includes(this.Seachtext.toLowerCase())
        );
    } else {
      this.filteredProjects = this.projectlist;
    }
    this.totalPages = Math.ceil(
      this.filteredProjects.length / this.itemsPerPage
    );
    this.currentPage = 1;
  }

  // Navigate to create project
  onClick() {
    this.router.navigate(['/pages-body/projectlist/createproject']);
  }

  // Navigate to update project
  onClickNavigateTo(projectId: string) {
    this.router.navigate(['/pages-body/projectlist/updatePoject/' + projectId]);
  }
}
