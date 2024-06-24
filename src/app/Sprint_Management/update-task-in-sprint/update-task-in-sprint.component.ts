import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../services/shared.service';
import { ApiServiceService } from '../../calender-management/shared/api-service.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

interface TaskWithProjectInfo {
  resourceAllocationId: number;
  taskName: string;
  percentage: number;
  projectName: string;
  projectId: string;
  relatedTasks: any[];
  selectedTaskId: string;
  initialTaskId: string;  // Track the initial task ID
  checked: boolean;
}

@Component({
  selector: 'app-update-task-in-sprint',
  templateUrl: './update-task-in-sprint.component.html',
  styleUrls: ['./update-task-in-sprint.component.css']
})
export class UpdateTaskInSprintComponent implements OnInit {

  resourceId: string = '';
  sprintId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];
  taskIds: string[] = [];
  sprintAllocations: any[] = [];
  tasksWithProjectInfo: TaskWithProjectInfo[] = [];
  commonTaskIds: string[] = [];
  updatedTasks: { resourceAllocationId: number, taskId: number }[] = [];
  changedTasks: Set<number> = new Set(); // Track temporarily changed tasks
  availabilityPercentage: number = 0;
  holidays: NgbDateStruct[] = [];
  currentTaskIndex: number | null = null; // Track the currently selected task

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService,
    private taskApiService: taskApiService,
    private router: Router,
    private toastr: ToastrService,
    private sharedService: SharedService,
    private ApiServiceService: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.resourceId = params['resourceId'];
      this.fetchData();
      this.fetchHolidays(this.resourceId); // Fetch holidays for the resource
    });
    this.route.queryParams.subscribe(params => {
      this.availabilityPercentage = params['availability'];
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

  fetchHolidays(resourceId: string): void {
    this.ApiServiceService.resourceGetEvents(resourceId).subscribe(
      (holidays: any[]) => {
        this.holidays = holidays.map(holiday => {
          const date = new Date(holiday.holiday.date);
          return {
            year: date.getFullYear(),
            month: date.getMonth() + 1, // Month is 0-based in JavaScript
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
              const taskWithProjectInfo: TaskWithProjectInfo = {
                resourceAllocationId: task.resourceAllocation ? task.resourceAllocation.id : null,
                taskName: task.resourceAllocation ? task.resourceAllocation.task.taskName : task.task.taskName,
                percentage: task.resourceAllocation ? task.resourceAllocation.percentage : null,
                projectName: projectInfo.projectName,
                projectId: projectInfo.projectId.toString(),
                relatedTasks: [],
                selectedTaskId: task.resourceAllocation ? task.resourceAllocation.task.taskid : task.task.taskid,
                initialTaskId: task.resourceAllocation ? task.resourceAllocation.task.taskid : task.task.taskid, // Store initial task ID
                checked: false // Initially not checked
              };
              this.tasksWithProjectInfo.push(taskWithProjectInfo);
              this.fetchRelatedTasks(projectInfo.projectId.toString(), this.tasksWithProjectInfo.length - 1);
              processedTaskIds.add(taskId); // Mark this task ID as processed
            }
          }
        }
      });
    });
  }

  fetchRelatedTasks(projectId: string, taskIndex: number): void {
    this.taskApiService.getTaskList(projectId).subscribe(
      relatedTasks => {
        this.tasksWithProjectInfo[taskIndex].relatedTasks = relatedTasks.map(task => ({
          ...task,
          disabled: Number(task.taskProgressPercentage) === 100
        }));
      },
      error => {
        console.error(`Error fetching related tasks for project ID ${projectId}:`, error);
      }
    );
  }

  onTaskChange(taskInfo: TaskWithProjectInfo, event: Event, index: number): void {
    const target = event.target as HTMLSelectElement;
    const taskId = Number(target.value);
    taskInfo.selectedTaskId = taskId.toString(); // Update the selectedTaskId
    this.changedTasks.add(taskInfo.resourceAllocationId); // Save temporarily changed task
    this.currentTaskIndex = index; // Set the currently selected task index
  }

  onSaveTask(taskInfo: TaskWithProjectInfo, index: number): void {
    if (this.currentTaskIndex !== index) {
      this.toastr.warning('Please update the selected task only.', 'Warning');
      return;
    }

    const taskAllocationId = taskInfo.resourceAllocationId;
    const selectedTaskId = Number(taskInfo.selectedTaskId);

    if (taskInfo.checked) {
      // If already checked, reset to initial value
      taskInfo.selectedTaskId = taskInfo.initialTaskId;
      const resetTaskIndex = this.updatedTasks.findIndex(item => item.resourceAllocationId === taskAllocationId);
      if (resetTaskIndex >= 0) {
        this.updatedTasks.splice(resetTaskIndex, 1); // Remove from updated tasks
      }
    } else {
      // If not checked, save the new task ID
      const updatedTaskIndex = this.updatedTasks.findIndex(item => item.resourceAllocationId === taskAllocationId);
      if (updatedTaskIndex >= 0) {
        this.updatedTasks[updatedTaskIndex].taskId = selectedTaskId;
      } else {
        this.updatedTasks.push({ resourceAllocationId: taskAllocationId, taskId: selectedTaskId });
      }
    }

    this.changedTasks.delete(taskAllocationId); // Remove from temporarily changed tasks
    taskInfo.checked = !taskInfo.checked; // Toggle the checked state
    this.currentTaskIndex = null; // Reset the currently selected task index
  }

  onEditTask(): void {
    const updateRequests = this.updatedTasks.map(update =>
      this.resourceAllocationService.updateResourceAllocationTaskId(update.resourceAllocationId, update.taskId)
    );

    forkJoin(updateRequests).subscribe(
      results => {
        this.toastr.success('Tasks updated successfully!', 'Success');
        this.sharedService.notifyTaskUpdated(); 
      },
      error => {
        this.toastr.error('Error updating tasks. Please try again.', 'Error');
      }
    );
  }

  deleteContent() {
    this.router.navigate(['/pages-body/sprint-management/sprintmgt/', this.sprintId]);
  }
}
