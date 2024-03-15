import { Component } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  constructor() {
    console.log('Project Criticality:', this.projectDetails[0].projectCriticality);
  }

  projectDetails: any = [
    {
      projectID: 1,
      projectName: 'Project 1',
      projectDescription: 'This is project 1',
      projectStartDate: '2021-08-01',
      projectEndDate: '2021-08-31',
      projectStatus: 'Active',
      ProjectCriticality: 'Low',
      deliveryManager: 'John Doe',
    }
  ];
  tasks: any = [
    {
      "taskId": 1,
      "expectedTaskPercentage": 20,
      "taskProgress": 50
    },
    {
      "taskId": 2,
      "expectedTaskPercentage": 50,
      "taskProgress": 75
    },
    {
      "taskId": 3,
      "expectedTaskPercentage": 30,
      "taskProgress": 10
    },
    {
      "taskId": 4,
      "expectedTaskPercentage": 70,
      "taskProgress": 30
    },
    {
      "taskId": 5,
      "expectedTaskPercentage": 10,
      "taskProgress": 90
    },
    {
      "taskId": 6,
      "expectedTaskPercentage": 40,
      "taskProgress": 20
    },
    {
      "taskId": 7,
      "expectedTaskPercentage": 60,
      "taskProgress": 70
    },
    {
      "taskId": 8,
      "expectedTaskPercentage": 80,
      "taskProgress": 45
    },
    {
      "taskId": 9,
      "expectedTaskPercentage": 90,
      "taskProgress": 55
    },
    {
      "taskId": 10,
      "expectedTaskPercentage": 25,
      "taskProgress": 85
    }
  ]
  
  handleTaskClick(data: any){
    console.log(data);
    
  }

}
