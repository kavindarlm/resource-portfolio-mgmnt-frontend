import { Component } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  data : any = [
    {
      id: 1,
      name: 'Project 1',
      description: 'Project 1 description'
    },
    {
      id: 2,
      name: 'Project 2',
      description: 'Project 2 description'
    },
    {
      id: 3,
      name: 'Project 3',
      description: 'Project 3 description'
    }
  ]
}
