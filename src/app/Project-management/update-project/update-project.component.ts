import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../service/api.service';
import { datamodel } from '../create-project/modelproject';
import { ProjectListComponent } from '../project-list/project-list.component';
import { sharedprojectService } from '../service/sharedproject.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css',
})
export class UpdateProjectComponent implements OnInit {
  public dataid!: string;
  subscrib!: Subscription;

  projectForm: datamodel = {
    projectid: '',
    projectName: '',
    projectStartDate: '',
    projectEndDate: '',
    criticality: '',
    projectManager: '',
    deliveryManager: '',
    projectDescription: '',
  };
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private projectList: ProjectListComponent,
    private shared: sharedprojectService,
    private spiner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((param: Params) => {
      this.dataid = param['get']('id');
      this.fetchProject();
    });

    this.subscrib = this.shared.refreshProjectfetch$.subscribe(() => {
      this.spiner.show();
      this.fetchProject();
      this.spiner.hide();
    });
  }

  fetchProject() {
    this.api.fetchProject(this.dataid).subscribe((data: datamodel) => {
      this.spiner.show();
      this.projectForm = data;
      this.spiner.hide();
    });
  }

  editProjectDetails() {
    this.api
      .updateProject(this.projectForm, this.dataid)
      .subscribe((res: datamodel) => {
        this.router.navigate(['/pages-body/projectlist']);
        this.projectList.getProjectList();
        this.shared.refreshProjectList();
        this.shared.refreshProjectCount();
      });
  }

  deleteProjectDetails() {
    this.api.deleteProject(this.dataid).subscribe((res: datamodel) => {
      this.router.navigate(['/pages-body/projectlist']);
      this.projectList.getProjectList();
      this.shared.refreshProjectList();
      this.shared.refreshProjectCount();
    });
  }
}
