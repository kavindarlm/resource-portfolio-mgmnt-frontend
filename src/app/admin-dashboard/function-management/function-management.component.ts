import { Component } from '@angular/core';

@Component({
  selector: 'app-function-management',
  templateUrl: './function-management.component.html',
  styleUrl: './function-management.component.css',
  template: `<app-button [buttonText]="buttonText" (buttonClicked)="handleButtonClick()"></app-button>`
})
export class FunctionManagementComponent {
  buttonText: string = 'Manage Functions';

  handleButtonClick() {
    console.log('Button was clicked');
  }
  // This is the function that will be called when the button is clicked
}
