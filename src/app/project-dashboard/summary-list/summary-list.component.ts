import { Component, OnInit } from '@angular/core';
import { ProjectDashboardService } from '../services/projectDashboard.service';

@Component({
  selector: 'app-summary-list',
  templateUrl: './summary-list.component.html',
  styleUrl: './summary-list.component.css'
})
export class SummaryListComponent implements OnInit{

  createdProject_count!: number;

  constructor(private projectDashboardServicee: ProjectDashboardService) {}

  ngOnInit(): void {
    this.getCreatedProjects();
  }

  getCreatedProjects(){
    this.projectDashboardServicee.getCreatedProjects().subscribe((data) => {
      this.createdProject_count = data as number
    });
  }

}
