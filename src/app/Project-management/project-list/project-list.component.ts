import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { datamodel } from '../create-project/modelproject';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
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

  openproject() {
    console.log('open project');
    this.sharedService.refreshProjectfetchData();
  }

  async getProjectList() {
    this.spiner.show();
    await this.api.getProjectList().subscribe((res) => {
      this.projects = res;
      this.spiner.hide();
    });
  }

  onSearchChange() {
    this.spiner.show();
    this.api.searchProject(this.searchText).subscribe((res) => {
      this.projects = res;
      this.spiner.hide();
    });
  }
}
