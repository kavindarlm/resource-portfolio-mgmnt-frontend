import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';

@Component({
  selector: 'app-update-task-in-sprint',
  templateUrl: './update-task-in-sprint.component.html',
  styleUrl: './update-task-in-sprint.component.css'
})
export class UpdateTaskInSprintComponent {
  resourceId: string = '';
  sprintId: string = '';
  resourceDetails: any = {};
  projectId: string = '';
  taskNames: string[] = [];
  tasks: any[] = [];
  projectTaskNames: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService,
    private taskApiService: taskApiService
  ) { }

  ngOnInit(): void {
    // Get the resourceId from the route parameters
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.resourceId = params['resourceId'];
      this.fetchResourceDetails();
      // this.fetchTasksWithProjectNames();
      this.fetchResourceAllocationsBySprintId();
    });
  }

  fetchResourceDetails(): void {
    this.resourceService.findOneResource(this.resourceId).subscribe(
      data => {
        this.resourceDetails = data;
      },
      error => {
        console.error('Error fetching resource details:', error);
      }
    );
  }

  // fetchTasksWithProjectNames(): void {
  //   this.fetchResourceAllocationsBySprintId().then(resourceAllocationData => {
  //     const taskNameToAllocationId: Record<string, number> = {};
  //     resourceAllocationData.forEach(allocation => {
  //       taskNameToAllocationId[allocation.task.taskName] = allocation.id;
  //     });

  //     this.resourceAllocationService.getTasksByResourceId(this.resourceId).subscribe(
  //       tasks => {
  //         this.tasks = tasks.filter(task => taskNameToAllocationId.hasOwnProperty(task.taskName))
  //           .map(task => {
  //             task.resourceAllocationId = taskNameToAllocationId[task.taskName];
  //             return task;
  //           });

  //         this.tasks.forEach(task => {
  //           this.taskApiService.getProjectInfoByTaskId(task.taskid).subscribe(
  //             projectInfo => {
  //               if (projectInfo) {
  //                 task.projectName = projectInfo.projectName;
  //                 task.projectId = projectInfo.projectId;
  //                 // Save the projectId for later use
  //                 this.projectId = task.projectId;

  //                 // Fetch task names for the project and save them to projectTaskNames array
  //                 this.fetchTaskNamesForProject();
  //               }
  //             },
  //             error => {
  //               console.error(`Error fetching project info for task ${task.taskid}:`, error);
  //             }
  //           );
  //         });
  //       },
  //       error => {
  //         console.error('Error fetching tasks:', error);
  //       }
  //     );
  //   });
  // }

  // Fetch task names for the project based on projectId and store them in projectTaskNames array
  fetchTaskNamesForProject(): void {
    this.taskApiService.getTaskList(this.projectId).subscribe(
      (tasks: any[]) => {
        this.projectTaskNames = tasks.map(task => task.taskName);
        console.log('Task names for project:', this.projectTaskNames);
      },
      error => {
        console.error('Error fetching task names for project:', error);
      }
    );
  }

  // Fetch resource allocation data by sprintId
  fetchResourceAllocationsBySprintId(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.resourceAllocationService.getResourceAllocationBySprintId(parseInt(this.sprintId)).subscribe(
        data => resolve(data),
        error => {
          console.error('Error fetching resource allocations by sprintId:', error);
          reject(error);
        }
      );
    });
  }
}
