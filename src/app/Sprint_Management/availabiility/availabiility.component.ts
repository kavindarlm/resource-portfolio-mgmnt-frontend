import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { ApiService } from '../../Project-management/service/api.service';
import { Observable } from 'rxjs';


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
  selectedProjectId: string='';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService, // Injecting the ResourceService
    private resourceAllocationServices: ResourceAllocationService,
    private taskApiService: taskApiService,
    private projectApiService: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resourceId = params['id'];
      this.fetchResourceDetails();
      this.fetchTasksWithProjectNames();
      this.fetchProjects(); // Call the fetchProjects method when the component initializes
    });
  }

  fetchResourceDetails(): void {
    this.resourceService.findOneResource(this.resourceId).subscribe(
      (data: any) => {
        this.resourceDetails = data;
        console.log('Resource details:', this.resourceDetails);
      },
      (error: any) => {
        console.error('Error fetching resource details:', error);
      }
    );
  }

  fetchTasksWithProjectNames(): void {
    this.resourceAllocationServices.getTasksByResourceId(this.resourceId).subscribe(
      (tasks: any[]) => {
        tasks.forEach(task => {
          this.taskApiService.getProjectNameByTaskId(task.taskid).subscribe(
            (projectName: string | null) => {
              task.projectName = projectName;
            },
            (error: any) => {
              console.error(`Error fetching project name for task ${task.taskid}:`, error);
            }
          );
        });
        this.tasks = tasks;
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  fetchProjects(): void {
    this.projectApiService.getProjectList().subscribe(
        (projects: any[]) => {
            // Store the entire project objects in the Projects array
            this.Projects = projects;
        },
        (error: any) => {
            console.error('Error fetching projects:', error);
        }
    );
}


onProjectSelect(event: Event): void {
  // Cast the event target to an HTMLSelectElement
  const selectElement = event.target as HTMLSelectElement;
  
  // Get the selected project ID from the value of the select element
  const projectId = selectElement.value;

  // Save the selected project ID in the parameter
  this.selectedProjectId = projectId;

  // Call the function to fetch tasks for the selected project
  this.fetchTasksByProjectId(projectId);
}

fetchTasksByProjectId(projectId: string): void {
  this.taskApiService.getTaskList(projectId).subscribe(
      (tasks: any[]) => {
          // Store the tasks in the Tasks array
          this.Tasks = tasks;

          // Optionally, you can handle additional logic here if needed
          console.log(`Fetched tasks for project ID ${projectId}:`, tasks);
      },
      (error: any) => {
          console.error(`Error fetching tasks for project ID ${projectId}:`, error);
      }
  );
}



  deleteContent() {
    this.router.navigate(['availableResources']);
  }

}
