import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { ApiService } from '../../Project-management/service/api.service';
import { sprintApiService } from '../services/sprintApi.service';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

interface ProjectTaskData {
  resourceId: string;
  taskId: string;
  percentage: number | null;
}

// Define a type to store both the task and its corresponding resource allocation data
interface TaskWithResourceAllocation {
  task: any; // Task entity
  resourceAllocation: any; // Resource allocation data
}

@Component({
  selector: 'app-availabiility',
  templateUrl: './availabiility.component.html',
  styleUrl: './availabiility.component.css'
})
export class AvailabiilityComponent implements OnInit {

  resourceId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];

  Projects: any[] = [];
  Tasks: any[] = [];
  sets: any[] = [{ projectId: '', taskId: '', percentage: null }]; // Initialize with one set of data

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService, // Injecting the ResourceService
    private resourceAllocationServices: ResourceAllocationService,
    private taskApiService: taskApiService,
    private projectApiService: ApiService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resourceId = params['id'];
      this.fetchResourceDetails();
      this.fetchTasksWithProjectNames();
      this.fetchProjects();
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
            // Create an array to hold the final data structure
            const finalData: { taskName: string, projectName: string, resourceAllocationPercentage: number }[] = [];

            // Keep track of the number of pending project info requests
            let pendingRequests = response.length;

            // Iterate through each task and its associated resource allocation
            response.forEach((item, index) => {
                const task = item.task;
                const resourceAllocation = item.resourceAllocation;

                // Fetch project information for each task
                this.taskApiService.getProjectInfoByTaskId(task.taskid).subscribe(
                    (projectInfo: { projectName: string, projectId: number } | null) => {
                        if (projectInfo) {
                            // Create a new object with task name, project name, and resource allocation percentage
                            finalData.push({
                                taskName: task.taskName,
                                projectName: projectInfo.projectName,
                                resourceAllocationPercentage: resourceAllocation.percentage,
                            });
                        } else {
                            console.warn(`No project information found for task ${task.taskid}`);
                        }

                        // Decrement pending requests count
                        pendingRequests--;

                        // If all pending requests are completed, assign finalData to this.tasks
                        if (pendingRequests === 0) {
                            this.tasks = finalData;
                        }
                    },
                    (error: any) => {
                        console.error(`Error fetching project information for task ${task.taskid}:`, error);
                        pendingRequests--;

                        // Check if all pending requests are completed
                        if (pendingRequests === 0) {
                            this.tasks = finalData;
                        }
                    }
                );
            });
        },
        (error: any) => {
            console.error('Error fetching tasks and resource allocations:', error);
        }
    );
}


  fetchProjects(): void {
    this.projectApiService.getProjectList().subscribe(
      (projects: any[]) => {
        this.Projects = projects;
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  onProjectSelect(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const projectId = selectElement.value;

    // Save the selected project ID in the correct set
    this.sets[index].projectId = projectId;

    // Fetch tasks based on the selected project
    this.fetchTasksByProjectId(projectId, index);
  }

  fetchTasksByProjectId(projectId: string, index: number): void {
    this.taskApiService.getTaskList(projectId).subscribe(
      (tasks: any[]) => {
        // Store tasks in the Tasks array
        this.Tasks = tasks;

        // Optionally, you can handle additional logic here if needed
        console.log(`Fetched tasks for project ID ${projectId}:`, tasks);
      },
      (error: any) => {
        console.error(`Error fetching tasks for project ID ${projectId}:`, error);
      }
    );
  }

  onTaskSelect(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    // Save the selected task ID in the correct set
    this.sets[index].taskId = selectElement.value;
  }

  addSet(): void {
    // Add a new set of project-task-percentage to the array
    this.sets.push({ projectId: '', taskId: '', percentage: null });
  }

  removeSet(index: number): void {
    // Remove the set at the specified index
    this.sets.splice(index, 1);
  }

  onAddClick(): void {
    // Iterate through the sets array and create a ProjectTaskData object for each set
    this.sets.forEach(set => {
      const projectTaskData: ProjectTaskData = {
        resourceId: this.resourceId,
        taskId: set.taskId,
        percentage: set.percentage
      };

      // Use the addData method from the shared service to add each set separately
      this.sharedService.addData(projectTaskData);
    });

    // Clear the sets array after adding data
    this.sets = [{ projectId: '', taskId: '', percentage: null }];
  }

  deleteContent() {
    this.router.navigate(['availableResources']);
  }
}
