import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';

@Component({
  selector: 'app-delete-resource-allocation',
  templateUrl: './delete-resource-allocation.component.html',
  styleUrl: './delete-resource-allocation.component.css'
})
export class DeleteResourceAllocationComponent {

  resourceId: string = '';
  sprintId: string = '';

  tasks: any[] = [];

  constructor(
    private route : ActivatedRoute,
    private resourceAllocationServices: ResourceAllocationService,
    private taskApiService: taskApiService,) { }


  ngOnInit(): void {
    // Get the resourceId from the route parameters
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.resourceId = params['resourceId'];
      this.fetchTasksWithProjectNames();
      this.fetchResourceAllocationsBySprintId();
    });
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

              // Assign project names and project IDs to filtered tasks
              this.tasks.forEach(task => {
                  this.taskApiService.getProjectInfoByTaskId(task.taskid).subscribe(
                      (projectInfo: { projectName: string, projectId: number } | null) => {
                          if (projectInfo) {
                              // Assign project name and project ID to the task
                              task.projectName = projectInfo.projectName;
                              task.projectId = projectInfo.projectId;
                          }
                      },
                      error => {
                          console.error(`Error fetching project info for task ${task.taskid}:`, error);
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
