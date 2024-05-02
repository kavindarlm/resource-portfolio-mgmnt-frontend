import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';

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

// Function to fetch tasks and filter them based on common task names with resource allocation data
fetchTasksWithProjectNames(): void {
  // Fetch resource allocations by sprintId
  this.fetchResourceAllocationsBySprintId().then((resourceAllocationData: any[]) => {
    // Create a mapping of task names to resource allocation IDs
    const taskNameToAllocationId: Record<string, number> = {};
    resourceAllocationData.forEach(allocation => {
      taskNameToAllocationId[allocation.task.taskName] = allocation.id;
    });

    // Fetch tasks by resourceId
    this.resourceAllocationServices.getTasksByResourceId(this.resourceId).subscribe(
      (tasks: any[]) => {
        // Filter tasks with common task names and assign resource allocation IDs
        this.tasks = tasks.filter(task => taskNameToAllocationId.hasOwnProperty(task.taskName))
                          .map(task => {
                            task.resourceAllocationId = taskNameToAllocationId[task.taskName];
                            return task;
                          });

        // Assign project names to filtered tasks
        this.tasks.forEach(task => {
          this.taskApiService.getProjectNameByTaskId(task.taskid).subscribe(
            (projectName: string | null) => {
              task.projectName = projectName;
            },
            error => {
              console.error(`Error fetching project name for task ${task.taskid}:`, error);
            }
          );
        });
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  });
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
