import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../calender-management/shared/api-service.service';
import { ConfirmDialogService } from '../../ConfirmDialogBox/confirm-dialog.service';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { SharedService } from '../services/shared.service';

interface TaskWithProjectInfo {
  resourceAllocationId: number;
  taskName: string;
  percentage: number;
  projectName: string;
  projectId: number;
}

@Component({
  selector: 'app-allocated-resource-information',
  templateUrl: './allocated-resource-information.component.html',
  styleUrls: ['./allocated-resource-information.component.css']
})
export class AllocatedResourceInformationComponent implements OnInit {
  resourceId: string = '';
  sprintId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];
  taskIds: string[] = [];
  sprintAllocations: any[] = [];
  tasksWithProjectInfo: TaskWithProjectInfo[] = [];
  commonTaskIds: string[] = [];
  holidays: NgbDateStruct[] = []; // Store holidays
  availabilityPercentage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService,
    private taskApiService: taskApiService,
    private router: Router,
    private toastr: ToastrService,
    private ApiServiceService: ApiServiceService,
    private confirmDialogService: ConfirmDialogService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.resourceId = params['resourceId'];
      this.fetchData(); // Fetch data whenever route parameters change
      this.fetchHolidays(this.resourceId); // Fetch holidays for the resource
    });
    this.route.queryParams.subscribe(queryParams => {
      this.availabilityPercentage = queryParams['availability'];
    });

    // Subscribe to sprint deletion notification
    this.sharedService.sprintDeleted$.subscribe(() => {
      // Handle sprint deletion here, e.g., close the component or refresh data
      this.tasksWithProjectInfo = [];
      this.tasks = [];
      this.sprintAllocations = [];
      this.resourceDetails = {};
      this.resourceId = '';
      this.sprintId = '';
    });
  }

  fetchData(): void {
    this.tasksWithProjectInfo = []; // Clear previous data
    this.tasks = []; // Clear previous tasks
    this.sprintAllocations = []; // Clear previous sprint allocations

    forkJoin({
      resourceDetails: this.resourceService.findOneResource(this.resourceId),
      tasks: this.resourceAllocationService.getTasksByResourceId(this.resourceId),
      sprintAllocations: this.resourceAllocationService.getResourceAllocationBySprintId(+this.sprintId)
    }).subscribe(
      ({ resourceDetails, tasks, sprintAllocations }) => {
        this.resourceDetails = resourceDetails;
        this.tasks = tasks;
        this.taskIds = tasks.map((item: any) => item.resourceAllocation.task.taskid);
        this.sprintAllocations = sprintAllocations;
        const sprintTaskIds = sprintAllocations.map(allocation => allocation.task.taskid);
        this.commonTaskIds = this.getCommonTaskIds(this.taskIds, sprintTaskIds);
        this.fetchProjectInfoForCommonTasks();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getCommonTaskIds(taskIds1: string[], taskIds2: string[]): string[] {
    const set1 = new Set(taskIds1);
    return taskIds2.filter(taskId => set1.has(taskId));
  }

  fetchProjectInfoForCommonTasks(): void {
    const projectInfoRequests = this.commonTaskIds.map(taskId =>
      this.taskApiService.getProjectInfoByTaskId(Number(taskId)).pipe(
        catchError(error => {
          console.error(`Error fetching project info for task ID ${taskId}:`, error);
          return of(null);
        })
      )
    );

    forkJoin(projectInfoRequests).subscribe(projectInfos => {
      const processedTaskIds = new Set<string>(); // To track processed task IDs
      projectInfos.forEach((projectInfo, index) => {
        if (projectInfo) {
          const taskId = this.commonTaskIds[index];
          if (!processedTaskIds.has(taskId)) {
            const task = this.tasks.find(task => task.resourceAllocation.task.taskid === taskId) ||
                        this.sprintAllocations.find(allocation => allocation.task.taskid === taskId);
            if (task) {
              this.tasksWithProjectInfo.push({
                resourceAllocationId: task.resourceAllocation ? task.resourceAllocation.id : null,
                taskName: task.resourceAllocation ? task.resourceAllocation.task.taskName : task.task.taskName,
                percentage: task.resourceAllocation ? task.resourceAllocation.percentage : null,
                projectName: projectInfo.projectName,
                projectId: projectInfo.projectId
              });
              processedTaskIds.add(taskId); // Mark this task ID as processed
            }
          }
        }
      });

      // If no tasks remain after deletion, close the component
      if (this.tasksWithProjectInfo.length === 0) {
        this.router.navigate(['/pages-body/sprint-management/pages-body/sprint-management/sprintmgt',this.sprintId]); // Navigate to wherever necessary
      }
    });
  }

  fetchHolidays(resourceId: string): void {
    this.ApiServiceService.resourceGetEvents(resourceId).subscribe(
      (holidays: any[]) => {
        this.holidays = holidays.map(holiday => {
          const date = new Date(holiday.holiday.date);
          return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          };
        });
      },
      (error: any) => {
        console.error('Error fetching holidays:', error);
      }
    );
  }

  disableAllDates(): boolean {
    return true;
  }

  isHoliday(date: NgbDateStruct): boolean {
    return this.holidays.some(holiday =>
      holiday.year === date.year &&
      holiday.month === date.month &&
      holiday.day === date.day
    );
  }

  openDeletePopup(resourceAllocationId: number, index: number): void {
    this.confirmDialogService.open('Are you sure you want to delete this task?').subscribe(confirmed => {
      if (confirmed) {
        this.confirmDeleteTask(resourceAllocationId, index);
      }
    });
  }

  confirmDeleteTask(resourceAllocationId: number, index: number): void {
    this.resourceAllocationService.deleteResourceAllocationById(resourceAllocationId).subscribe(
      () => {
        this.tasksWithProjectInfo.splice(index, 1);
        this.toastr.success('Resource Allocation deleted successfully!', 'Success');
        // Notify shared service about task deletion
        this.sharedService.notifyTaskUpdated();
      },
      error => {
        this.toastr.error('Error deleting resource allocation', 'Error');
      }
    );
  }

  deleteContent() {
    this.router.navigate(['/pages-body/sprint-management/sprintmgt/', this.sprintId]);
  }
}
