import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css'
})
export class UnitListComponent implements OnInit{
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
