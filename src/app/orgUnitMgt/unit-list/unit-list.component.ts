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

  showcomponent(){
    this.showForm = !this.showForm;
  }

  unitList: any = [
    {
      ID: "1",
      Name: "Unit 1",
      Parent: "",
      Description: "This is unit 1"
    },
    {
      ID: "2",
      Name: "Unit 2",
      Parent: "Unit 1",
      Description: "This is unit 1"
    },
    {
      ID: "3",
      Name: "Unit 3",
      Parent: "Unit 1",
      Description: "This is unit 1"
    },
    {
      ID: "4",
      Name: "Unit 4",
      Parent: "Unit 2",
      Description: "This is unit 1"
    },
    {
      ID: "5",
      Name: "Unit 5",
      Parent: "Unit 3",
      Description: "This is unit 1"
    },
    {
      ID: "6",
      Name: "Unit 6",
      Parent: "Unit 3",
      Description: "This is unit 1"
    },
    {
      ID: "7",
      Name: "Unit 7",
      Parent: "Unit 3",
      Description: "This is unit 1"
    },
    {
      ID: "8",
      Name: "Unit 8",
      Parent: "Unit 6",
      Description: "This is unit 1"
    },
    {
      ID: "9",
      Name: "Unit 9",
      Parent: "Unit 6",
      Description: "This is unit 1"
    },
    {
      ID: "10",
      Name: "Unit 10",
      Parent: "Unit 6",
      Description: "This is unit 1"
    }
  ]

  
}
