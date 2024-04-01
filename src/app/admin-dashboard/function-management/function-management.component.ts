import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-function-management',
  templateUrl: './function-management.component.html',
  styleUrl: './function-management.component.css',
})
export class FunctionManagementComponent {
  buttonText: string = 'Manage Functions';

  handleButtonClick() {
    console.log('Button was clicked');
  }
  // This is the function that will be called when the button is clicked
  constructor(private router : Router) { }
  functions = [
      { "func_id": "1", "func_name": "Project Dashboard" },
      { "func_id": "2", "func_name": "Handle Request" },
      { "func_id": "3", "func_name": "Sprint Management" },
      { "func_id": "4", "func_name": "Calendar Management" },
      { "func_id": "5", "func_name": "Unit Management" },
      { "func_id": "6", "func_name": "Team Management" },
      { "func_id": "7", "func_name": "Resource Management" },
      { "func_id": "8", "func_name": "Project Management" },
      { "func_id": "9", "func_name": "Update Task Progress" }
  ];

  functionIds: string[] = []; //for store the fuc_id as array


  handleClick(func_id: string) {
    this.functionIds.push(func_id);
    console.log(func_id);
    console.log(this.functionIds);
  }
  
  
}
