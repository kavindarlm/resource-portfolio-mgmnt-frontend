import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-team-button',
  templateUrl: './new-team-button.component.html',
  styleUrl: './new-team-button.component.css'
})
export class NewTeamButtonComponent implements OnInit{

  @Input() text: string = '';

  showForm = false;

  constructor(){
    this.showForm = false;
  }

  toggleForm(){
    this.showForm = this.showForm;
  }

  ngOnInit(): void {
      
  }
 

}
