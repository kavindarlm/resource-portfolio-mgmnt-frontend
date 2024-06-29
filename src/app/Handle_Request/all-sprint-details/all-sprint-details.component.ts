import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { sprintApiService } from '../../Sprint_Management/services/sprintApi.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { ResourceAllocationService } from '../../Sprint_Management/services/resource-allocation.service';
import { forkJoin, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-all-sprint-details',
  templateUrl: './all-sprint-details.component.html',
  styleUrl: './all-sprint-details.component.css'
})
export class AllSprintDetailsComponent implements OnInit{
  Seachtext: string = ''; 
  sprints: any[] = [];
  filteredSprints: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private sprintApiService: sprintApiService,
    private ResourceAllocationService: ResourceAllocationService,
    private taskApiService:taskApiService
  ) {}

  ngOnInit(): void {
    this.fetchSprints();
  }

  fetchSprints(): void {
    this.spinner.show();
    this.sprintApiService.getAllSprints().pipe(
      switchMap((data) => {
        const sprintRequests = data.map(sprint => this.ResourceAllocationService.getResourceAllocationBySprintId(sprint.sprint_id).pipe(
          switchMap(resourceAllocations => {
            const uniqueResourceIds = new Set(resourceAllocations.map(allocation => allocation.resource.resourceId));
            const projectRequests = resourceAllocations.map(allocation => {
              const taskId = allocation.task.taskid; // Correctly access task ID
              if (taskId !== undefined) {
                return this.taskApiService.getProjectInfoByTaskId(taskId);
              } else {
                console.error('Task ID is undefined for allocation', allocation);
                return of(null);
              }
            });
  
            return forkJoin(projectRequests).pipe(
              map(projects => {
                const uniqueProjectIds = new Set(projects.filter(project => project !== null).map(project => project!.projectId));
                sprint.resourceCount = uniqueResourceIds.size;
                sprint.projectCount = uniqueProjectIds.size;
                const endDate = new Date(sprint.end_Date);
                sprint.status = endDate < new Date() ? 'Not Active' : 'Active';
                return sprint;
              })
            );
          })
        ));
  
        return forkJoin(sprintRequests);
      })
    ).subscribe(
      (sprints) => {
        this.sprints = sprints;
        this.filteredSprints = this.sprints;
        this.totalPages = Math.ceil(this.sprints.length / this.itemsPerPage);
        this.spinner.hide();
      },
      (error) => {
        console.error('Error fetching sprints', error);
        this.spinner.hide();
      }
    );
  }
  
  getPaginatedSprints(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredSprints.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  navigateToSprint(sprintId: number): void {
    this.router.navigate([`/pages-body/handle-request/sprintDetails/${sprintId}`]);
  }

  navigateToAddResources(sprintId: number): void {
    this.router.navigate([`/pages-body/handle-request/sprintDetails/${sprintId}/availableResourceList/${sprintId}`]);
  }

  onSearchChange(): void {
    if (!this.Seachtext) {
      this.filteredSprints = this.sprints;
    } else {
      this.filteredSprints = this.sprints.filter(sprint =>
        sprint.sprint_name.toLowerCase().includes(this.Seachtext.toLowerCase())
      );
    }
    this.totalPages = Math.ceil(this.filteredSprints.length / this.itemsPerPage);
    this.currentPage = 1;
  }
}
