import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';

// Define a type to store both the task and its corresponding resource allocation data
interface TaskWithResourceAllocation {
  task: any; // Task entity
  resourceAllocation: any; // Resource allocation data
}

@Component({
  selector: 'app-allocated-resource-information',
  templateUrl: './allocated-resource-information.component.html',
  styleUrl: './allocated-resource-information.component.css'
})
export class AllocatedResourceInformationComponent {

  resourceId: string = '';
  sprintId: string = '';
  resourceDetails: any = {};

  tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private resourceAllocationServices: ResourceAllocationService,
    private taskApiService: taskApiService,) { }

  ngOnInit(): void {
    // Get the resourceId from the route parameters
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.resourceId = params['resourceId'];
      this.fetchResourceDetails();
      this.fetchTasksWithProjectNames();
      this.fetchResourceAllocationsBySprintId();
    });
  }

  fetchResourceDetails(): void {
    this.resourceService.findOneResource(this.resourceId).subscribe(
      (data: any) => {
        this.resourceDetails = data;
      },
      (error: any) => {
        console.error('Error fetching resource details:', error);
      }
    );
  }
  fetchTasksWithProjectNames(): void {
    // Fetch tasks and resource allocations by resourceId
    this.resourceAllocationServices.getTasksByResourceId(this.resourceId).subscribe(
      (response: { task: any, resourceAllocation: any }[]) => {
        // Iterate through the tasks and resource allocations
        response.forEach(item => {
          const task = item.task;
          const resourceAllocation = item.resourceAllocation;

          // Fetch project information for each task
          this.taskApiService.getProjectInfoByTaskId(task.taskid).subscribe(
            (projectInfo: { projectName: string, projectId: number } | null) => {
              if (projectInfo) {
                // Assign project name and project ID to the task
                task.projectName = projectInfo.projectName;
                task.projectId = projectInfo.projectId;
              } else {
                console.warn(`No project information found for task ${task.taskid}`);
              }
            },
            error => {
              console.error(`Error fetching project info for task ${task.taskid}:`, error);
            }
          );
        });

        // Assign the response data to this.tasks
        this.tasks = response;
      },
      error => {
        console.error('Error fetching tasks and resource allocations:', error);
      }
    );
  }

  // Fetch resource allocation data by sprintId
  fetchResourceAllocationsBySprintId(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.resourceAllocationServices.getResourceAllocationBySprintId(parseInt(this.sprintId)).subscribe(
        data => resolve(data),
        error => {
          console.error('Error fetching resource allocations by sprintId:', error);
          reject(error);
        }
      );
    });
  }


  // Method to handle delete button click
  handleDeleteTask(resourceAllocationId: number, index: number): void {
    // Call the delete method from the service
    this.resourceAllocationServices.deleteResourceAllocationById(resourceAllocationId).subscribe(
      () => {
        // Remove the task from the tasks array using the index
        this.tasks.splice(index, 1);
        console.log(`Resource allocation with ID ${resourceAllocationId} deleted successfully.`);
      },
      error => {
        console.error(`Error deleting resource allocation with ID ${resourceAllocationId}:`, error);
      }
    );
  }


}
