import { Component } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  // showProjectForm=false;
  constructor(){
    // this.showProjectForm=false;
  }

  // displayProjectForm(){
  //   this.showProjectForm=true;
  // }

  ngOnInit(): void {}
  
  projectDetails: any = [
    {
      projectID: 1,
      projectName: 'Project 1',
      projectDescription: 'This is project 1',
      projectStartDate: '2021-08-01',
      projectEndDate: '2021-08-31',
      projectStatus: 'Active',
    },
    {
      projectID: 2,
      projectName: 'Project 2',
      projectDescription: 'This is project 2',
      projectStartDate: '2021-09-01',
      projectEndDate: '2021-09-30',
      projectStatus: 'Inactive',
    },
    {
      projectID: 3,
      projectName: 'Project 3',
      projectDescription: 'This is project 3',
      projectStartDate: '2021-10-01',
      projectEndDate: '2021-10-31',
      projectStatus: 'Active',
    },
    {
      projectID: 4,
      projectName: 'Project 4',
      projectDescription: 'This is project 4',
      projectStartDate: '2021-11-01',
      projectEndDate: '2021-11-30',
      projectStatus: 'Active',
    },
    {
      projectID: 5,
      projectName: 'Project 5',
      projectDescription: 'This is project 5',
      projectStartDate: '2021-12-01',
      projectEndDate: '2021-12-31',
      projectStatus: 'Inactive',
    },
    {
      projectID: 6,
      projectName: 'Project 6',
      projectDescription: 'This is project 6',
      projectStartDate: '2022-01-01',
      projectEndDate: '2022-01-31',
      projectStatus: 'Active',
    },
    {
      projectID: 7,
      projectName: 'Project 7',
      projectDescription: 'This is project 7',
      projectStartDate: '2022-02-01',
      projectEndDate: '2022-02-28',
      projectStatus: 'Active',
    },
    {
      projectID: 8,
      projectName: 'Project 8',
      projectDescription: 'This is project 8',
      projectStartDate: '2022-03-01',
      projectEndDate: '2022-03-31',
      projectStatus: 'Inactive',
    },
    {
      projectID: 9,
      projectName: 'Project 9',
      projectDescription: 'This is project 9',
      projectStartDate: '2022-04-01',
      projectEndDate: '2022-04-30',
      projectStatus: 'Active',
    },
    {
      projectID: 10,
      projectName: 'Project 10',
      projectDescription: 'This is project 10',
      projectStartDate: '2022-05-01',
      projectEndDate: '2022-05-31',
      projectStatus: 'Active',
    },
    {
      projectID: 1,
      projectName: 'Project 1',
      projectDescription: 'This is project 1',
      projectStartDate: '2021-08-01',
      projectEndDate: '2021-08-31',
      projectStatus: 'Active',
    },
    {
      projectID: 2,
      projectName: 'Project 2',
      projectDescription: 'This is project 2',
      projectStartDate: '2021-09-01',
      projectEndDate: '2021-09-30',
      projectStatus: 'Inactive',
    },
    {
      projectID: 3,
      projectName: 'Project 3',
      projectDescription: 'This is project 3',
      projectStartDate: '2021-10-01',
      projectEndDate: '2021-10-31',
      projectStatus: 'Active',
    },
    {
      projectID: 4,
      projectName: 'Project 4',
      projectDescription: 'This is project 4',
      projectStartDate: '2021-11-01',
      projectEndDate: '2021-11-30',
      projectStatus: 'Active',
    },
    {
      projectID: 5,
      projectName: 'Project 5',
      projectDescription: 'This is project 5',
      projectStartDate: '2021-12-01',
      projectEndDate: '2021-12-31',
      projectStatus: 'Inactive',
    },
    { 
      projectID: 6,
      projectName: 'Project 6',
      projectDescription: 'This is project 6',
      projectStartDate: '2022-01-01',
      projectEndDate: '2022-01-31',
      projectStatus: 'Active',
    },
    {
      projectID: 7,
      projectName: 'Project 7',
      projectDescription: 'This is project 7',
      projectStartDate: '2022-02-01',
      projectEndDate: '2022-02-28',
      projectStatus: 'Active',
    },
    {
      projectID: 8,
      projectName: 'Project 8',
      projectDescription: 'This is project 8',
      projectStartDate: '2022-03-01',
      projectEndDate: '2022-03-31',
      projectStatus: 'Inactive',
    },
    {
      projectID: 9,
      projectName: 'Project 9',
      projectDescription: 'This is project 9',
      projectStartDate: '2022-04-01',
      projectEndDate: '2022-04-30',
      projectStatus: 'Active',
    },
    {
      projectID: 10,
      projectName: 'Project 10',
      projectDescription: 'This is project 10',
      projectStartDate: '2022-05-01',
      projectEndDate: '2022-05-31',
      projectStatus: 'Active',
    },
    // Add more dummy projects as needed
  ];

  openProject(project: any) {
    // Implement the logic to open the corresponding project
    console.log('Opening project:', project.projectName);
    alert("Opening project:");
    // Example: Navigate to a project detail page
    // this.router.navigate(['/project', project.id]);
  }
}
