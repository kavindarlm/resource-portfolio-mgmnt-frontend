import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectDashboardService } from '../services/projectDashboard.service';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: {
    position: string
  };
  colors: string[];
};

@Component({
  selector: 'app-summary-list',
  templateUrl: './summary-list.component.html',
  styleUrls: ['./summary-list.component.css']
})
export class SummaryListComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  createdProject_count!: number;
  highCriticality_count!: number;
  mediumCriticality_count!: number;
  lowCriticality_count!: number;
  resource_count!: number;
  ongoingProject_count!: number;

  constructor(private projectDashboardService: ProjectDashboardService) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 250,
        type: "pie",
        animations: {
          enabled: true
        },
      },
      labels: ["High", "Medium", "Low"], 
      colors: ["#FF6161", "#FFDA61", "#61E5FF"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      legend: {
        position: 'bottom'
      }
    };
  }
  ngOnInit(): void {
    this.getCreatedProjects();
    this.getCriticalityCount();
    this.getResourceCount();
    this.getOngoingProjectCount();
  }

  getCreatedProjects(){
    this.projectDashboardService.getCreatedProjects().subscribe((data) => {
      this.createdProject_count = data as number
    });
  }

  // function to get the criticality count
  getCriticalityCount() {
    this.projectDashboardService.getCriticalityCount().subscribe((data) => {
      this.highCriticality_count = data.high;
      this.mediumCriticality_count = data.medium;
      this.lowCriticality_count = data.low;

      this.chartOptions.series = [this.highCriticality_count, this.mediumCriticality_count, this.lowCriticality_count];
    });
  }

  // function to get the resource count
  getResourceCount(){
    this.projectDashboardService.getResourceCount().subscribe(res => {
      this.resource_count = res;
    });
  }

  // function to get the ongoing project count
  getOngoingProjectCount(){
    this.projectDashboardService.getOngoingProjectCount().subscribe(res => {
      this.ongoingProject_count = res;
    });
  }

}