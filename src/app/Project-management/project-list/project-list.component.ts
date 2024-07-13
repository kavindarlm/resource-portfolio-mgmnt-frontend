import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../service/api.service';
import { datamodel } from '../create-project/modelproject';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, catchError } from 'rxjs';
import { sharedprojectService } from '../service/sharedproject.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: datamodel[] = [];
  searchText: string = '';
  subscrip!: Subscription;
  error: any;

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private sharedService: sharedprojectService
  ) {}

  ngOnInit(): void {
    this.subscrip = this.sharedService.refreshProjectList$.subscribe(() => {
      this.getProjectList();
    });
    this.getProjectList();
  }

  ngOnDestroy(): void {
    this.subscrip.unsubscribe();
  }

  openproject() {
    console.log('open project');
    this.sharedService.refreshProjectfetchData();
  }

  getProjectList() {
    this.spinner.show();
    this.api.getProjectList().pipe(
      catchError(error => {
        this.error = error;
        this.spinner.hide();
        return [];
      })
    ).subscribe((res: datamodel[]) => {
      this.projects = res;
      this.totalPages = Math.ceil(this.projects.length / this.itemsPerPage);
      this.spinner.hide();
    });
  }

  onSearchChange() {
    this.spinner.show();
    this.api.searchProject(this.searchText).pipe(
      catchError(error => {
        this.error = error;
        this.spinner.hide();
        return [];
      })
    ).subscribe((res: datamodel[]) => {
      this.projects = res;
      this.totalPages = Math.ceil(this.projects.length / this.itemsPerPage);
      this.spinner.hide();
    });
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  get paginatedProjects(): datamodel[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.projects.slice(start, end);
  }
}
