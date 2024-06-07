import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define a type to store both the task and its corresponding project information
interface TaskWithProjectInfo {
  resourceAllocationId: number;
  taskName: string;
  percentage: number; // Changed from taskAllocationPercentage
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
              projectName: projectInfo.projectName,
              projectId: projectInfo.projectId
            });
          }
        }
      });
    });
  }

  handleDeleteTask(resourceAllocationId: number, index: number): void {
    if (resourceAllocationId) {
      this.resourceAllocationService.deleteResourceAllocationById(resourceAllocationId).subscribe(
        () => {
          this.tasksWithProjectInfo.splice(index, 1);
          console.log(`Resource allocation with ID ${resourceAllocationId} deleted successfully.`);
        },
        error => {
          console.error(`Error deleting resource allocation with ID ${resourceAllocationId}:`, error);
        }
      );
    }
  }
}
