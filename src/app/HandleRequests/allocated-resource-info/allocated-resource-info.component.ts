import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { ResourceAllocationService } from '../../services/resource_allocation.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-allocated-resource-info',
  templateUrl: './allocated-resource-info.component.html',
  styleUrl: './allocated-resource-info.component.css'
})
export class AllocatedResourceInfoComponent {

  resourceId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];

  constructor(
    private route:ActivatedRoute,
    private resourceService: ResourceService,
    private resourceAllocationServices: ResourceAllocationService,
    private taskService: TaskService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resourceId = params['id'];
      this.fetchResourceDetails();
      this.fetchTasksWithProjectNames();
    });
  }
  
  fetchResourceDetails(): void {
    this.resourceService.getResourceById(this.resourceId).subscribe(
      (data: any) => {
        this.resourceDetails = data;
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
          this.taskService.getProjectNameByTaskId(task.task_id).subscribe(
            (projectName: string | null) => {
              task.projectName = projectName;
            },
            (error: any) => {
              console.error(`Error fetching project name for task ${task.task_id}:`, error);
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


}
