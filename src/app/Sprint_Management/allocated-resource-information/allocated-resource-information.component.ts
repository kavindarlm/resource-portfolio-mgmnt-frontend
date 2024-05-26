import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { forkJoin } from 'rxjs';

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
  taskIds: string[] = []; // Array to store task IDs
  taskids: string[] = [];
  commonTaskIds: string[] = []; // Array to store common task IDs

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
      this.fetchTasksWithSprintIDs();
      this.findCommonTaskIds();
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

          // Store task ID in the array
          this.taskIds.push(task.taskid);

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

        // Log the array of task IDs
        console.log('Task IDs:', this.taskIds);

        // Assign the response data to this.tasks
        this.tasks = response;
      },
      error => {
        console.error('Error fetching tasks and resource allocations:', error);
      }
    );
  }

  fetchTasksWithSprintIDs(): void {
    // Call your service method to get resource allocation data by sprint ID
    this.resourceAllocationServices.getResourceAllocationBySprintId(Number(this.sprintId)).subscribe(
      (resourceAllocations: any[]) => {
        // Extract task IDs and store them in the taskIds array
        this.taskids = resourceAllocations.map(resourceAllocation => resourceAllocation.task.taskid);
        console.log('Task IDs:', this.taskids);
  
        // Now that taskids are fetched, find common task IDs
        this.findCommonTaskIds();
      },
      (error: any) => {
        console.error('Error fetching resource allocation data by sprint ID:', error);
      }
    );
  }
  

  findCommonTaskIds(): void {
    // Use filter to find the common task IDs between taskIds and taskids arrays
    this.commonTaskIds = this.taskIds.filter(taskId => this.taskids.includes(taskId));
    console.log('Common Task IDs:', this.commonTaskIds);
  }

fetchProjectInfoForCommonTasks(): void {
  if (this.commonTaskIds.length === 0) {
    return; // No common task IDs to fetch project info for
  }

  // Convert commonTaskIds array elements from string to number
  const taskIdsAsNumbers: number[] = this.commonTaskIds.map(taskId => parseInt(taskId, 10));

  // Array to store observables for each HTTP request
  const observables = taskIdsAsNumbers.map(taskId => {
    return this.taskApiService.getProjectInfoByTaskId(taskId);
  });

  // Use forkJoin to handle multiple HTTP requests concurrently
  forkJoin(observables).subscribe(
    (projectInfos: Array<{ projectName: string, projectId: number } | null>) => {
      // projectInfos is an array containing project information for each task ID
      console.log('Project Info for Common Tasks:', projectInfos);

      // Array to store project information objects
      const projects: { projectName: string, projectId: number }[] = [];

      // Iterate over projectInfos and store project information in the projects array
      projectInfos.forEach(info => {
        if (info) {
          const project = {
            projectName: info.projectName,
            projectId: Number(info.projectId) // Convert projectId to number
          };
          projects.push(project);
        }
      });

      // Now you have the project information in the projects array
      console.log('Projects:', projects);

      // You can handle the projects array here, such as assigning it to a property
      // or performing further processing
    },
    error => {
      console.error('Error fetching project info for common tasks:', error);
    }
  );
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
