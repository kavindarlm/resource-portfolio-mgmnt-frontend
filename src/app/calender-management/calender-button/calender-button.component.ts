import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calender-button',
  templateUrl: './calender-button.component.html',
  styleUrl: './calender-button.component.css'
})
export class CalenderButtonComponent {

  @Input() text: string;
  @Input() btnClass:string;

  constructor(){
    this.text = '';
    this.btnClass = '';

  }

}
