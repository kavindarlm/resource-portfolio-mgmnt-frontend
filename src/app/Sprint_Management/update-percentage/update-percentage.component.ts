import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../calender-management/shared/api-service.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

interface TaskWithProjectInfo {
  resourceAllocationId: number;
  taskName: string;
  percentage: number;
  initialPercentage: number; // Ensure it's always defined as a number
  projectName: string;
  projectId: number;
  isUpdated?: boolean;  // New property to track update status
}

@Component({
  selector: 'app-update-percentage',
  templateUrl: './update-percentage.component.html',
  styleUrls: ['./update-percentage.component.css']
})
export class UpdatePercentageComponent implements OnInit {
  resourceId: string = '';
  sprintId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];
  taskIds: string[] = [];
  sprintAllocations: any[] = [];
  tasksWithProjectInfo: TaskWithProjectInfo[] = [];
  commonTaskIds: string[] = [];
  availabilityPercentage: number = 0; 
  holidays: NgbDateStruct[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService,
    private taskApiService: taskApiService,
    private toastr: ToastrService,
    private ApiServiceService: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.resourceId = params['resourceId'];
      this.fetchData();
    });
    this.route.queryParams.subscribe(params => {
      this.availabilityPercentage = params['availability']; 
    });  
  }

  fetchData(): void {
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
          return of(null); // Return null if there is an error
        })
      )
    );

    forkJoin(projectInfoRequests).subscribe(projectInfos => {
      projectInfos.forEach((projectInfo, index) => {
        if (projectInfo) {
          const taskId = this.commonTaskIds[index];
          const task = this.tasks.find(task => task.resourceAllocation.task.taskid === taskId) ||
                       this.sprintAllocations.find(allocation => allocation.task.taskid === taskId);
          if (task) {
            this.tasksWithProjectInfo.push({
              resourceAllocationId: task.resourceAllocation ? task.resourceAllocation.id : null,
              taskName: task.resourceAllocation ? task.resourceAllocation.task.taskName : task.task.taskName,
              percentage: task.resourceAllocation ? task.resourceAllocation.percentage : null,
              initialPercentage: task.resourceAllocation ? task.resourceAllocation.percentage : null,
              projectName: projectInfo.projectName,
              projectId: projectInfo.projectId
            });
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

  confirmTaskChange(taskInfo: TaskWithProjectInfo): void {
    if (taskInfo.isUpdated) {
      taskInfo.percentage = taskInfo.initialPercentage; // Reset the percentage
      taskInfo.isUpdated = false; // Reset the update status
    } else {
      this.updateResourceAllocation(taskInfo); // Update the percentage
    }
  }

  updateResourceAllocation(taskInfo: TaskWithProjectInfo): void {
    // Store the initial percentage value before updating if it's not already set
    if (taskInfo.initialPercentage === undefined) {
      taskInfo.initialPercentage = taskInfo.percentage;
    }

    taskInfo.isUpdated = true; // Mark as updated locally
  }

  updatePercentage(): void {
    // Loop through tasksWithProjectInfo and call updateResourceAllocation for each task
    this.tasksWithProjectInfo.forEach(taskInfo => {
      // Only update the resource allocation if it's marked as updated locally
      if (taskInfo.isUpdated) {
        this.resourceAllocationService.updateResourceAllocationPercentage(taskInfo.resourceAllocationId, { percentage: taskInfo.percentage })
          .subscribe(
            (updatedResourceAllocation) => {
              this.toastr.success('Percentage updated successfully!', 'Success');
              taskInfo.isUpdated = false; // Reset the local update status after successful update
            },
            (error) => {
              this.toastr.error('Error updating percentage. Please try again.', 'Error');
            }
          );
      }
    });
  }

  deleteContent() {
    this.router.navigate(['/pages-body/sprint-management/sprintmgt/',this.sprintId]);
  }

}
