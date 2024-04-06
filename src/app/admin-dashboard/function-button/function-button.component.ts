import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-function-button',
  templateUrl: './function-button.component.html',
  styleUrl: './function-button.component.css',
})
export class FunctionButtonComponent {
  @Input() buttonText: string = 'Default'; // Default button text
  // @Output() buttonClicked = new EventEmitter<string>();
  isClicked = false;


  // This is the function that will be called when the button is clicked
  handleClick() {
    this.isClicked = !this.isClicked;
    this.buttonText = this.isClicked ? 'Done' : 'Add';
  }

  get buttonClass() {
    return this.isClicked ? 'btn-success' : 'btn-outline-success'; 
  }

  
}
