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


}
