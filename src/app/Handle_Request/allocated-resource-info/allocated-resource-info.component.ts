import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../../Sprint_Management/services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../calender-management/shared/api-service.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

interface TaskWithProjectInfo {
  resourceAllocationId: number;
  taskName: string;
  percentage: number;
  projectName: string;
  projectId: number;
}

@Component({
  selector: 'app-allocated-resource-info',
  templateUrl: './allocated-resource-info.component.html',
  styleUrl: './allocated-resource-info.component.css'
})
export class AllocatedResourceInfoComponent {
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

  isDeletePopupVisible: boolean = false;
  deleteResourceAllocationId: number | null = null;
  deleteTaskIndex: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService,
    private taskApiService: taskApiService,
    private router: Router,
    private toastr: ToastrService,
    private ApiServiceService: ApiServiceService
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
    this.deleteResourceAllocationId = resourceAllocationId;
    this.deleteTaskIndex = index;
    this.isDeletePopupVisible = true;
  }

  confirmDeleteTask(): void {
    if (this.deleteResourceAllocationId !== null && this.deleteTaskIndex !== null) {
      this.resourceAllocationService.deleteResourceAllocationById(this.deleteResourceAllocationId).subscribe(
        () => {
          if (typeof this.deleteTaskIndex === 'number') {
            this.tasksWithProjectInfo.splice(this.deleteTaskIndex, 1);
          }
          console.log(`Resource allocation with ID ${this.deleteResourceAllocationId} deleted successfully.`);
          this.toastr.success('Resource Allocation deleted successfully!', 'Success');
          this.resetDeletePopup();
        },
        error => {
          this.toastr.error('Error deleting resource allocation', 'Error');
          this.resetDeletePopup();
        }
      );
    }
  }

  cancelDeleteTask(): void {
    this.resetDeletePopup();
  }

  resetDeletePopup(): void {
    this.isDeletePopupVisible = false;
    this.deleteResourceAllocationId = null;
    this.deleteTaskIndex = null;
  }

  deleteContent() {
    this.router.navigate(['/pages-body/handle-request/sprintDetails/', this.sprintId]);
  }
}