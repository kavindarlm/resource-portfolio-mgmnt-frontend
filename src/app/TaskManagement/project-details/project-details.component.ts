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
}
