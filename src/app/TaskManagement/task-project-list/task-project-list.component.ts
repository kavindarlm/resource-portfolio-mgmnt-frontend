import { Component, OnInit } from '@angular/core';
import { projectModel } from '../dataModels/projectModel';
import { taskApiService } from '../services/taskApi.service';
import { taskSharedService } from '../services/taskshared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-project-list',
  templateUrl: './task-project-list.component.html',
  styleUrls: ['./task-project-list.component.css']
})
export class TaskProjectListComponent implements OnInit {
  data: projectModel[] = [];
  searchText: string = '';
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10; // Adjust the items per page as needed

  constructor(
    private api: taskApiService, 
    private shared: taskSharedService, 
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getProjectLists();
  }

  getProjectLists(): void {
    this.spinner.show();
    this.api.getProjectList().subscribe(res => {
      this.data = res;
      this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
      this.spinner.hide();
    });
  }

  onSearchChange(): void {
    this.api.searchProject(this.searchText).subscribe(res => {
      this.data = res;
      this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    });
  }

  openProject(): void {
    this.shared.refreshProjectDetails();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get paginatedData(): projectModel[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }
}
