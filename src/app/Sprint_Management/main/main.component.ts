import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  sprint: any = [
    {
      id: 1,
      name: "Sprint 01",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-15")
  },
  {
      id: 2,
      name: "Sprint 02",
      startDate: new Date("2024-03-16"),
      endDate: new Date("2024-03-31")
  },
  {
      id: 3,
      name: "Sprint 03",
      startDate: new Date("2024-04-01"),
      endDate: new Date("2024-04-15")
  },
  {
      id: 4,
      name: "Sprint 04",
      startDate: new Date("2024-04-16"),
      endDate: new Date("2024-04-30")
  },
  {
      id: 5,
      name: "Sprint 05",
      startDate: new Date("2024-05-01"),
      endDate: new Date("2024-05-15")
  }
  ];
  

}
