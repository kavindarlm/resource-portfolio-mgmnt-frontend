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
  projectlist: datamodel[] | undefined;
  filteredProjects: datamodel[] = [];
  resourceNames: { [key: string]: string } = {};
  Seachtext!: string;

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
        this.projectlist?.forEach((project) => {
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

  // Get resource name by resource id
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

  // Get paginated projects
  getPaginatedProjects() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProjects.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  // Change page
  changePage(page: number) {
    this.currentPage = page;
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
