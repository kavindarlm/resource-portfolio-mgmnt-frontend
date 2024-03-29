import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-function-button',
  templateUrl: './function-button.component.html',
  styleUrl: './function-button.component.css',
  template: `<button (click)="onButtonClick()">{{buttonText}}</button>`
})
export class FunctionButtonComponent {
  @Input() buttonText: string = 'Default'; // Default button text
  @Output() buttonClicked = new EventEmitter<string>();

  onButtonClick() {
    this.buttonClicked.emit(this.buttonText);
  }

  // This is the function that will be called when the button is clicked
}
