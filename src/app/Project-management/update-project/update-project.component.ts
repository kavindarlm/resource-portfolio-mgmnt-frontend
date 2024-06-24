import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../service/api.service';
import { criticalityModel, datamodel, resourceIdNameModel } from '../create-project/modelproject';
import { ProjectListComponent } from '../project-list/project-list.component';
import { sharedprojectService } from '../service/sharedproject.service';
import { Subscription, catchError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { ConfirmDialogService } from '../../ConfirmDialogBox/confirm-dialog.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css'],
})
export class UpdateProjectComponent implements OnInit {
  public dataid!: string;
  subscrib!: Subscription;
  delivarManagerName!: string;
  projectManagerName!: string;
  showManagerDropdown = false;
  showDeliveryDropdown = false;
  managers: resourceIdNameModel[] = [];
  filteredManagers: resourceIdNameModel[] = [];

  projectForm: datamodel = {
    projectid: '',
    projectName: '',
    projectStartDate: '',
    projectEndDate: '',
    criticality_id: '',
    projectManager_id: '',
    deliveryManager_id: '',
    projectDescription: '',
  };

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private projectList: ProjectListComponent,
    private shared: sharedprojectService,
    private spiner: NgxSpinnerService,
    private toaster: ToastrService,
    private taskApiService: taskApiService,
    private confirmBox: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((param: Params) => {
      this.dataid = param['get']('id');
      this.fetchProject();
    });

    this.subscrib = this.shared.refreshProjectfetch$.subscribe(() => {
      this.fetchProject();
    });

    // Fetch initial list of managers
    this.fetchManagers();
  }

  fetchManagers() {
    this.api.getResourceNameAndId().subscribe(res => {
      this.managers = res;
      console.log('managers:', res);
      this.filteredManagers = res.slice(0, 4);
    });
  }

  toggleManagerDropdown(type: string) {
    if (type === 'projectManager') {
      this.showManagerDropdown = !this.showManagerDropdown;
      this.showDeliveryDropdown = false;
    } else if (type === 'deliveryManager') {
      this.showDeliveryDropdown = !this.showDeliveryDropdown;
      this.showManagerDropdown = false;
    }
  }

  filterManagers(type: string) {
    const searchQuery = type === 'projectManager' ? this.projectManagerName : this.delivarManagerName;
    this.filteredManagers = this.managers.filter(manager =>
      manager.resourceName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (type === 'projectManager') {
      this.showManagerDropdown = true;
    } else if (type === 'deliveryManager') {
      this.showDeliveryDropdown = true;
    }
  }

  selectManager(manager: any, type: string) {
    if (type === 'projectManager') {
      this.projectManagerName = manager.resourceName;
      this.projectForm.projectManager_id = manager.resourceId;
      this.showManagerDropdown = false;
    } else if (type === 'deliveryManager') {
      this.delivarManagerName = manager.resourceName;
      this.projectForm.deliveryManager_id = manager.resourceId;
      this.showDeliveryDropdown = false;
    }
  }

  fetchProject() {
    this.api.fetchProject(this.dataid)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch project:', error);
          return [];
        })
      )
      .subscribe((data: datamodel) => {
        this.spiner.show();
        this.projectForm = data;
        this.getResourceNameById(data.deliveryManager_id, data.projectManager_id);
        this.spiner.hide();
      });
  }

  editProjectDetails() {
    // Validate Project Name
    if (!this.projectForm.projectName) {
      this.toaster.error('Project Name is required.', 'Validation Error');
      return;
    }

    // Validate Project Description
    if (!this.projectForm.projectDescription) {
      this.toaster.error('Project Description is required.', 'Validation Error');
      return;
    }
  
    // Validate Project Criticality
    if (!this.projectForm.criticality_id) {
      this.toaster.error('Project Criticality is required.', 'Validation Error');
      return;
    }
  
    // Validate Project Manager
    if (!this.projectForm.projectManager_id) {
      this.toaster.error('Project Manager is required.', 'Validation Error');
      return;
    }
  
    // Validate Delivery Manager
    if (!this.projectForm.deliveryManager_id) {
      this.toaster.error('Delivery Manager is required.', 'Validation Error');
      return;
    }
  
    // Validate Dates
    if (!this.validateDates()) {
      return;
    }
    
    this.confirmBox.open('Are you sure you want to update this project?').subscribe(confirmed => {
      if (confirmed) {
        this.api.updateProject(this.projectForm, this.dataid)
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
    })
    // If all validations pass, proceed to update project
    
  }
  

  deleteProjectDetails() {
    this.confirmBox.open('Are you sure you want to delete this project?').subscribe(confirmed => {
      if (confirmed) {
        this.api.deleteProject(this.dataid)
        .pipe(
          catchError((error) => {
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
    });
  }

  deleteSucceseMassege(projectname: string) {
    this.toaster.success(
      `${projectname} Delete successfully`,
      'Project Deleted Successfully',
      { timeOut: 3000 }
    );
  }

  editSucceseMassege(projectname: string) {
    this.toaster.success(
      `${projectname} Updated successfully`,
      'Project Updated Successfully',
      { timeOut: 3000 }
    );
  }

  validateDates(): boolean {
    const startDate = new Date(this.projectForm.projectStartDate);
    const endDate = new Date(this.projectForm.projectEndDate);
    if (startDate > endDate) {
      this.toaster.error('End date must be after start date.', 'Date Validation Error');
      return false;
    }
    return true;
  } 

  getResourceNameById(delivaryMangerIdid: string, projectManagerId: string) {
    this.taskApiService.getResourceNameByResourceId(delivaryMangerIdid).subscribe(res => {
      this.delivarManagerName = res.resourceName;
    });

    this.taskApiService.getResourceNameByResourceId(projectManagerId).subscribe(res => {
      this.projectManagerName = res.resourceName;
    });
  }
}
