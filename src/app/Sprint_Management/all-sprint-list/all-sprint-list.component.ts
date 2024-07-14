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

  // Sorting properties
  sortState: number = 0; // 0 = no sorting, 1 = ascending, 2 = descending
  sortStateStartDate: number = 0;
  sortStateEndDate: number = 0;
  sortStateResourceCount: number = 0;
  sortStateProjectCount: number = 0;

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
        console.error('Error fetching sprints:', error);
        this.spinner.hide();
      }
    );
  }

  onSearchChange(): void {
    this.filteredSprints = this.sprints.filter(sprint => sprint.sprint_name.toLowerCase().includes(this.SearchText.toLowerCase()));
    this.totalPages = Math.ceil(this.filteredSprints.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page on search
  }

  getPaginatedSprints(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredSprints.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  navigateToSprint(sprintId: number): void {
    this.router.navigate([`/pages-body/sprint-management/sprintmgt/${sprintId}`]);
  }

  toggleSort(column: string): void {
    if (column === 'sprintName') {
      this.sortState = this.sortState === 1 ? 2 : 1;
      this.sortStateStartDate = 0;
      this.sortStateEndDate = 0;
      this.sortStateResourceCount = 0;
      this.sortStateProjectCount = 0;
    } else if (column === 'startDate') {
      this.sortStateStartDate = this.sortStateStartDate === 1 ? 2 : 1;
      this.sortState = 0;
      this.sortStateEndDate = 0;
      this.sortStateResourceCount = 0;
      this.sortStateProjectCount = 0;
    } else if (column === 'endDate') {
      this.sortStateEndDate = this.sortStateEndDate === 1 ? 2 : 1;
      this.sortState = 0;
      this.sortStateStartDate = 0;
      this.sortStateResourceCount = 0;
      this.sortStateProjectCount = 0;
    } else if (column === 'resourceCount') {
      this.sortStateResourceCount = this.sortStateResourceCount === 1 ? 2 : 1;
      this.sortState = 0;
      this.sortStateStartDate = 0;
      this.sortStateEndDate = 0;
      this.sortStateProjectCount = 0;
    } else if (column === 'projectCount') {
      this.sortStateProjectCount = this.sortStateProjectCount === 1 ? 2 : 1;
      this.sortState = 0;
      this.sortStateStartDate = 0;
      this.sortStateEndDate = 0;
      this.sortStateResourceCount = 0;
    }

    this.sortSprints(column);
  }

  sortSprints(column: string): void {
    const direction = column === 'sprintName' ? this.sortState : 
                      column === 'startDate' ? this.sortStateStartDate : 
                      column === 'endDate' ? this.sortStateEndDate : 
                      column === 'resourceCount' ? this.sortStateResourceCount : 
                      this.sortStateProjectCount;

    this.filteredSprints.sort((a, b) => {
      let comparison = 0;

      if (column === 'sprintName') {
        comparison = a.sprint_name.localeCompare(b.sprint_name);
      } else if (column === 'startDate') {
        comparison = new Date(a.start_Date).getTime() - new Date(b.start_Date).getTime();
      } else if (column === 'endDate') {
        comparison = new Date(a.end_Date).getTime() - new Date(b.end_Date).getTime();
      } else if (column === 'resourceCount') {
        comparison = a.resourceCount - b.resourceCount;
      } else if (column === 'projectCount') {
        comparison = a.projectCount - b.projectCount;
      }

      return direction === 1 ? comparison : -comparison;
    });
  }
}
