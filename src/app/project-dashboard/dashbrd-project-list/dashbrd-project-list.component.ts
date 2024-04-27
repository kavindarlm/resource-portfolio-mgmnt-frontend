import { Component, OnInit } from '@angular/core';
import { projectDataModel } from '../projct-dshbrd-model/dshbrd-project';
import { ProjectDashboardService } from '../services/projectDashboard.service';
import { DashbrdSharedService } from '../services/dshbrdshared.service';

@Component({
  selector: 'app-dashbrd-project-list',
  templateUrl: './dashbrd-project-list.component.html',
  styleUrl: './dashbrd-project-list.component.css'
})
export class DashbrdProjectListComponent implements OnInit{
  // projects = [
  //   { id: 1, title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 97, 97)' },
  //   { id: 2, title: 'Transport service App', progress: 70, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 218, 97)' },
  //   { id: 3, title: 'Transport service App', progress: 40, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 97, 97)' },
  //   { id: 4, title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(97, 229, 255)' },
  //   { id: 5, title: 'Transport service App', progress: 40, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(97, 229, 255)' },
  //   { id: 6, title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(97, 229, 255)' },
  //   { id: 7, title: 'Transport service App', progress: 90, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 218, 97)' },
  //   { id: 8, title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 97, 97)' },
  //   { id: 9, title: 'Transport service App', progress: 20, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(97, 229, 255)'},
  //   { id: 10, title: 'Transport service App', progress: 10, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 218, 97)' },
  //   { id: 11, title: 'Transport service App', progress: 50, startDate: '12/12/2023', endDate: '12/12/2024', color: 'rgb(255, 97, 97)' },
  // ];

  projectdata: undefined| projectDataModel[];

  constructor(private projectDashboardServicee: ProjectDashboardService, private sharedService : DashbrdSharedService) { 
    this.sharedService.viewMore$.subscribe(value => {
      this.isViewMoreClicked = value;
      this.itemsPerPage = 8;
    });
  }

  isViewMoreClicked = false;
  currentPage = 1;
  itemsPerPage = 8;

  get totalPages() {
      return this.projectdata ? Math.ceil(this.projectdata.length / this.itemsPerPage) : 0;

  }
  
  ngOnInit(): void {
    this.getAllprojects();
  }

  viewMore() {
    this.isViewMoreClicked = true;
    this.itemsPerPage = 4;
    // this.currentPage = 1;
  }

  getAllprojects(){
    this.projectDashboardServicee.getAllProject().subscribe((data: projectDataModel[]) => {
      this.projectdata = data;
    })
  }

}
