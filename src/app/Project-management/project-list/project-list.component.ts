import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { datamodel } from '../create-project/modelproject';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, catchError } from 'rxjs';
import { sharedprojectService } from '../service/sharedproject.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css',
})
export class ProjectListComponent {
  projects: undefined | datamodel[];
  searchText: string = '';
  subscrip!: Subscription;
  error: any; // Variable to hold error information
  
  constructor(
    private api: ApiService,
    private spiner: NgxSpinnerService,
    private sharedService: sharedprojectService
  ) {}

  ngOnInit(): void {
    this.subscrip = this.sharedService.refreshProjectList$.subscribe(() => {
      this.getProjectList();
    });
  }

  //Shared Serice call to upadate project details in update project component
  openproject() {
    console.log('open project');
    this.sharedService.refreshProjectfetchData();
  }

  //Fetch Project List
  getProjectList() {
    this.spiner.show();
    this.api.getProjectList().pipe(
      catchError(error => {
        this.error = error; // Assign error to the variable for display
        return []; // Return empty array to prevent further processing
      })
    ).subscribe((res: datamodel[]) => {
      this.projects = res;
      this.spiner.hide();
    });
  }

  //Search Projects
  onSearchChange() {
    this.spiner.show();
    this.api.searchProject(this.searchText).pipe(
      catchError(error => {
        this.error = error; // Assign error to the variable for display
        return []; // Return empty array to prevent further processing
      })
    ).subscribe((res: datamodel[]) => {
      this.projects = res;
      this.spiner.hide();
    });
  }
}
