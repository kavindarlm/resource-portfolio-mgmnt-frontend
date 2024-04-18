import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { ResourceAllocationService } from '../../services/resource_allocation.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-availabiility',
  templateUrl: './availabiility.component.html',
  styleUrl: './availabiility.component.css'
})
export class AvailabiilityComponent  {

  resourceId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private resourceAllocationServices: ResourceAllocationService,
    private taskService: TaskService 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resourceId = params['id'];
      this.fetchResourceDetails();
      this.fetchTasks();
    });
  }
  fetchResourceDetails(): void {
    // Call the resource service to fetch resource details
    this.resourceService.getResourceById(this.resourceId).subscribe(
      (data: any) => {
        this.resourceDetails = data;
      },
      (error: any) => { // Specify the type of error parameter explicitly
        console.error('Error fetching resource details:', error);
      }
    );
  }

  fetchTasks(): void {
    this.resourceAllocationServices.getTasksByResourceId(this.resourceId).subscribe(
      (tasks: any[]) => {
        this.tasks = tasks;
      },
      (error: any) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  

  deleteContent(){
    
  }

  Projects: string[] = ['Project 01', 'Project 02', 'Project 03'];
  Tasks : string[] = ['Task 01', 'Task 02', 'Task 03'];

  AddPercentages(){
    
  }
  
}
