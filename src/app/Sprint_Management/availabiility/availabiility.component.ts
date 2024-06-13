import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { ApiService } from '../../Project-management/service/api.service';
import { SharedService } from '../services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { forkJoin, map, switchMap } from 'rxjs';

interface ProjectTaskData {
  resourceId: string;
  taskId: string;
  percentage: number | null;
}

@Component({
  selector: 'app-availabiility',
  templateUrl: './availabiility.component.html',
  styleUrls: ['./availabiility.component.css']
})
export class AvailabiilityComponent implements OnInit {

  resourceId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];

  Projects: any[] = [];
  Tasks: any[] = [];
  sets: any[] = [{ projectId: '', taskId: '', percentage: null }]; // Initialize with one set of data

  taskProjectDetails: { taskName: string, projectName: string, percentage: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService, // Injecting the ResourceService
    private toastr: ToastrService,
    private taskApiService: taskApiService,
    private projectApiService: ApiService,
    private ResourceAllocationService : ResourceAllocationService, 
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resourceId = params['id'];
      this.fetchResourceDetails();
      this.fetchProjects();
      this.fetchTasksAndProjectsByResourceId(this.resourceId); // Fetch tasks and project details
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

  fetchTasksAndProjectsByResourceId(resourceId: string): void {
    // Reset the arrays before fetching new data
    this.taskProjectDetails = [];
    this.tasks = []; 
    this.Projects = []; // Reset Projects array if needed
  
    this.ResourceAllocationService.getTasksByResourceId(resourceId).pipe(
      switchMap(tasks => {
        const projectDetailsObservables = tasks.map(task => 
          this.taskApiService.getProjectInfoByTaskId(task.resourceAllocation.task.taskid).pipe(
            map(project => ({
              taskName: task.resourceAllocation.task.taskName,
              projectName: project?.projectName || 'Unknown',
              percentage: task.resourceAllocation.percentage
            }))
          )
        );
        return forkJoin(projectDetailsObservables);
      })
    ).subscribe(
      taskProjectDetails => {
        this.taskProjectDetails = taskProjectDetails;
        console.log('Task and project details:', this.taskProjectDetails);
      },
      error => {
        console.error('Error fetching task and project details:', error);
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
    this.sets[index].projectId = projectId;
    this.fetchTasksByProjectId(projectId, index);
  }

  fetchTasksByProjectId(projectId: string, index: number): void {
    this.taskApiService.getTaskList(projectId).subscribe(
      (tasks: any[]) => {
        this.sets[index].Tasks = tasks; // Store tasks in the specific set
        console.log(`Fetched tasks for project ID ${projectId}:`, tasks);
      },
      (error: any) => {
        console.error(`Error fetching tasks for project ID ${projectId}:`, error);
      }
    );
  }

  onTaskSelect(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sets[index].taskId = selectElement.value;
  }
  addSet(): void {
    // Add a new set of project-task-percentage to the array
    this.sets.push({ projectId: '', taskId: '', percentage: null });
  }

  removeSet(index: number): void {
    // Check if there's only one set left, if yes, prevent removal
    if (this.sets.length === 1) {
      this.toastr.error('At least one set should be there.', 'Error');
      return;
    }

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
    this.router.navigate(['/pages-body/sprint-management/createform/availableResources']);
  }
}
