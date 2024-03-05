import { Component } from '@angular/core';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent {

  showForm = false;

  constructor(){
    this.showForm = false;
  
  }

  toggleMainBox() {
    this.showForm = !this.showForm;
  }

  teams:any = [
    {
      teamName: 'Team 1',
      descrpition: 'This is team 1',
      resourceIds: [1,2,3]
    },
    {
      teamName: 'Team 2',
      descrpition: 'This is team 2',
      resourceIds: [4,5,6]
    },
    {
      teamName: 'Team 3',
      descrpition: 'This is team 3',
      resourceIds: [7,8,9]
    }
  ]

  


}
