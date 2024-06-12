import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface TaskWithProjectInfo {
  resourceAllocationId: number;
  taskName: string;
  percentage: number;
  projectName: string;
  projectId: string;
  relatedTasks: any[];
  selectedTaskId: string;
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

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService,
    private taskApiService: taskApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.resourceId = params['resourceId'];
      this.fetchData();
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
          return of(null);
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
            const taskWithProjectInfo: TaskWithProjectInfo = {
              resourceAllocationId: task.resourceAllocation ? task.resourceAllocation.id : null,
              taskName: task.resourceAllocation ? task.resourceAllocation.task.taskName : task.task.taskName,
              percentage: task.resourceAllocation ? task.resourceAllocation.percentage : null,
              projectName: projectInfo.projectName,
              projectId: projectInfo.projectId.toString(),
              relatedTasks: [],
              selectedTaskId: task.resourceAllocation ? task.resourceAllocation.task.taskid : task.task.taskid,
              checked: false // Initially not checked
            };
            this.tasksWithProjectInfo.push(taskWithProjectInfo);
            this.fetchRelatedTasks(projectInfo.projectId.toString(), this.tasksWithProjectInfo.length - 1);
          }
        }
      });
    });
  }


  fetchRelatedTasks(projectId: string, taskIndex: number): void {
    this.taskApiService.getTaskList(projectId).subscribe(
      relatedTasks => {
        this.tasksWithProjectInfo[taskIndex].relatedTasks = relatedTasks;
      },
      error => {
        console.error(`Error fetching related tasks for project ID ${projectId}:`, error);
      }
    );
  }

  onTaskChange(taskInfo: TaskWithProjectInfo, event: Event): void {
    const target = event.target as HTMLSelectElement;
    const taskId = Number(target.value);
    taskInfo.selectedTaskId = taskId.toString(); // Update the selectedTaskId
    this.changedTasks.add(taskInfo.resourceAllocationId); // Save temporarily changed task
    console.log('Updated Tasks:', this.updatedTasks);
  }

  onSaveTask(taskInfo: TaskWithProjectInfo): void {
    const taskAllocationId = taskInfo.resourceAllocationId;
    const selectedTaskId = Number(taskInfo.selectedTaskId);
    const updatedTaskIndex = this.updatedTasks.findIndex(item => item.resourceAllocationId === taskAllocationId);
    if (updatedTaskIndex >= 0) {
      this.updatedTasks[updatedTaskIndex].taskId = selectedTaskId;
    } else {
      this.updatedTasks.push({ resourceAllocationId: taskAllocationId, taskId: selectedTaskId });
    }
    this.changedTasks.delete(taskAllocationId); // Remove from temporarily changed tasks
    taskInfo.checked = true; // Change button appearance to success
  }

  onEditTask(): void {
    const updateRequests = this.updatedTasks.map(update =>
      this.resourceAllocationService.updateResourceAllocationTaskId(update.resourceAllocationId, update.taskId)
    );

    forkJoin(updateRequests).subscribe(
      results => {
        console.log('Tasks updated successfully:', results);
        // Optionally, refetch data or update the UI to reflect changes
      },
      error => {
        console.error('Error updating tasks:', error);
      }
    );
  }
}
