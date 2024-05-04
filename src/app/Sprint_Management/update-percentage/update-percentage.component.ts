import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-percentage',
  templateUrl: './update-percentage.component.html',
  styleUrl: './update-percentage.component.css'
})
export class UpdatePercentageComponent {

  resourceId: string = '';
  sprintId: string = '';
  resourceDetails: any = {};
  projectId: string = '';
  tasks: any[] = [];
  updatedTasks: any[] = []; // To track tasks that have been updated
  // Track original allocation percentages and modified state
  originalPercentages: Record<number, number> = {}; // Maps resource allocation ID to original percentage
  modifiedTasks: Record<number, boolean> = {}; // Maps resource allocation ID to modified state (true or false)

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private resourceAllocationServices: ResourceAllocationService,
    private taskApiService: taskApiService,
  ) { }

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
    this.fetchResourceAllocationsBySprintId().then(resourceAllocationData => {
      const taskNameToAllocationId: Record<string, number> = {};
      resourceAllocationData.forEach(allocation => {
        taskNameToAllocationId[allocation.task.taskName] = allocation.id;
      });

      this.resourceAllocationServices.getTasksByResourceId(this.resourceId).subscribe(
        (response: { task: any, resourceAllocation: any }[]) => {
          // Process each response item
          response.forEach(item => {
            const task = item.task;
            const resourceAllocation = item.resourceAllocation;
            // Store the original percentage value and track if the task is modified
            this.originalPercentages[resourceAllocation.id] = resourceAllocation.percentage;
            this.modifiedTasks[resourceAllocation.id] = false;

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
    });
  }

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

  // Handle input change
  onTaskAllocationChange(task: any): void {
    // Track the modified state of the task
    task.isModified = true;
    // Update the modified state in the map
    this.modifiedTasks[task.resourceAllocation.id] = true;
    // Add the task to the updatedTasks list if not already present
    if (!this.updatedTasks.includes(task)) {
      this.updatedTasks.push(task);
    }
  }

  // Function to handle clicking on the confirmation button
  confirmTaskChange(task: any): void {
    // Toggle the isConfirmed state of the task
    task.isConfirmed = !task.isConfirmed;

    if (task.isConfirmed) {
      // If the task is now confirmed (green background with white icon), set the task as updated
      this.onTaskAllocationChange(task);
    } else {
      // If the task is toggled back to unconfirmed (reset the state):
      // Reset the task's percentage to the original value
      task.resourceAllocation.percentage = this.originalPercentages[task.resourceAllocation.id];

      // Update the modified state of the task
      task.isModified = false;

      // Remove the task from the list of updated tasks
      this.updatedTasks = this.updatedTasks.filter(t => t !== task);
    }
  }

  applyChanges(): void {
    // Array to hold update requests
    const updateRequests: Observable<any>[] = [];

    // Iterate through each modified task
    this.updatedTasks.forEach(task => {
      // Create the update data for the resource allocation
      const updateData = {
        percentage: task.resourceAllocation.percentage
      };

      // Send the update request and push it into the updateRequests array
      const updateRequest = this.resourceAllocationServices.updateResourceAllocation(task.resourceAllocation.id, updateData);
      updateRequests.push(updateRequest);
    });

    // Use the RxJS forkJoin operator to wait for all update requests to complete
    forkJoin(updateRequests).subscribe(
      responses => {
        console.log('All resource allocations updated successfully:', responses);
        // Once updates are complete, clear the list of updated tasks
        this.updatedTasks = [];
      },
      error => {
        console.error('Error updating resource allocations:', error);
      }
    );
  }

}
