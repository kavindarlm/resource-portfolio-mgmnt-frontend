import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit {
  
  showForm = false;
  constructor() {
    this.showForm=false;
  }
  ngOnInit(): void {

  }
  showcomponent(): void{
    this.showForm =! this.showForm;
  }
}
