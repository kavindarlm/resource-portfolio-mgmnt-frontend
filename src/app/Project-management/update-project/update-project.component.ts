import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../service/api.service';
import { datamodel } from '../create-project/modelproject';
import { ProjectListComponent } from '../project-list/project-list.component';
import { sharedprojectService } from '../service/sharedproject.service';
import { Subscription, catchError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
    private spiner: NgxSpinnerService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((param: Params) => {
      this.dataid = param['get']('id');
      this.fetchProject();
    });

    this.subscrib = this.shared.refreshProjectfetch$.subscribe(() => {
      this.fetchProject();
    });
  }

  //Fetching the project details
  fetchProject() {
    this.api
      .fetchProject(this.dataid)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch project:', error);
          return [];
        })
      )
      .subscribe((data: datamodel) => {
        this.spiner.show();
        this.projectForm = data;
        this.spiner.hide();
      });
  }

  //Update Project Details
  editProjectDetails() {
    this.api
      .updateProject(this.projectForm, this.dataid)
      .pipe(
        catchError((error) => {
          console.error('Failed to update project:', error);
          return [];
        })
      )
      .subscribe((res: datamodel) => {
        this.editSucceseMassege(this.projectForm.projectName);
        this.router.navigate(['/pages-body/projectlist']);
        this.projectList.getProjectList();
        this.shared.refreshProjectList();
        this.shared.refreshProjectCount();
      });
  }

  //Delete Project Details
  deleteProjectDetails() {
    this.api
      .deleteProject(this.dataid)
      .pipe(
        catchError((error) => {
          // Handle error here
          console.error('Failed to delete project:', error);
          return [];
        })
      )
      .subscribe((res: datamodel) => {
        this.deleteSucceseMassege(this.projectForm.projectName);
        this.router.navigate(['/pages-body/projectlist']);
        this.projectList.getProjectList();
        this.shared.refreshProjectList();
        this.shared.refreshProjectCount();
      });
  }


  //Delete Success Message
  deleteSucceseMassege(projectname: string) {
    this.toaster.success(
      `${projectname} Delete successfully`,
      'Project Deleted Successfully',
      { timeOut: 3000 }
    );
  }

  //Edit Success Message
  editSucceseMassege(projectname: string) {
    this.toaster.success(
      `${projectname} Updated successfully`,
      'Project Updated Successfully',
      { timeOut: 3000 }
    );
  }
}
