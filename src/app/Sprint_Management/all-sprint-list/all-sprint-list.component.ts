import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { sprintApiService } from '../services/sprintApi.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { forkJoin, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-all-sprint-list',
  templateUrl: './all-sprint-list.component.html',
  styleUrls: ['./all-sprint-list.component.css']
})
export class AllSprintListComponent implements OnInit {
  
  SearchText: string = ''; 
  sprints: any[] = [];
  filteredSprints: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private sprintApiService: sprintApiService,
    private resourceAllocationService: ResourceAllocationService,
    private taskApiService: taskApiService,
    private refreshData: SidebarheaderServiceService
  ) {}

  ngOnInit(): void {
    this.refreshData.refreshSystem$.subscribe(() => {
      this.fetchSprints();
    });
    this.fetchSprints();
  }

  fetchSprints(): void {
    this.spinner.show();
    this.sprintApiService.getAllSprints().pipe(
      switchMap((sprints) => {
        const sprintObservables = sprints.map(sprint => 
          this.resourceAllocationService.getResourceAllocationBySprintId(sprint.sprint_id).pipe(
            switchMap(resourceAllocations => {
              const uniqueResourceIds = new Set(resourceAllocations.map(allocation => allocation.resource.resourceId));
              const projectRequests = resourceAllocations.map(allocation => {
                const taskId = allocation.task.taskid;
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
                }),
                catchError(error => {
                  console.error('Error fetching project info for sprint', sprint, error);
                  return of(sprint); // Return original sprint in case of error
                })
              );
            })
          )
        );

        return forkJoin(sprintObservables);
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
    this.router.navigate([`/pages-body/sprint-management/sprintmgt/${sprintId}`]);
  }

  onSearchChange(): void {
    if (!this.SearchText) {
      this.filteredSprints = this.sprints; // Reset to show all sprints if search text is empty
    } else {
      this.filteredSprints = this.sprints.filter(sprint =>
        sprint.sprint_name.toLowerCase().includes(this.SearchText.toLowerCase())
      );
    }
    this.totalPages = Math.ceil(this.filteredSprints.length / this.itemsPerPage);
    this.currentPage = 1;
  }
}
