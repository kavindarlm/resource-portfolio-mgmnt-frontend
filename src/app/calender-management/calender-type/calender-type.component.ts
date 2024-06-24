import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender-type',
  templateUrl: './calender-type.component.html',
  styleUrl: './calender-type.component.css'
})
export class CalenderTypeComponent implements OnInit {

  showMainCalenderBox = false;

  constructor() {
    this.showMainCalenderBox = false;
  }

  accessMainCalenderBox() {
    this.showMainCalenderBox = !this.showMainCalenderBox;
  }

  ngOnInit(): void {
  }

}
