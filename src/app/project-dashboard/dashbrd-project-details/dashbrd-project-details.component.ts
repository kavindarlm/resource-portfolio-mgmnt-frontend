import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../admin-dashboard/admin-dashboard-services/dashboard.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ProjectDashboardService } from '../services/projectDashboard.service';
import { MangerNameandIdModel, projectDataModel, resourceDataModel } from '../projct-dshbrd-model/dshbrd-project';
import { DashbrdSharedService } from '../services/dshbrdshared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashbrd-project-details',
  templateUrl: './dashbrd-project-details.component.html',
  styleUrl: './dashbrd-project-details.component.css'
})
export class DashbrdProjectDetailsComponent implements OnInit {
  public projectid!: string;
  projectData: undefined | projectDataModel;
  resourceData: undefined | resourceDataModel;
  isviewMoreClicked = true;
  managerDetails: undefined | MangerNameandIdModel;
  delivaryManagerDetails: undefined | MangerNameandIdModel;
  projectMangerId!: string;
  delivaryManagerId!: string;

  resource_names: string[] = [];
  resource_count: number = 0;

  constructor(private projectdashboardservice: ProjectDashboardService, private activatedRoute: ActivatedRoute, private router: Router, private sharedService: DashbrdSharedService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      this.projectid = param['get']('id');
      this.fetchProject();
      this.fetchResourceList();
    });
  }
  // Fetching the project details
  fetchProject() {
    this.projectdashboardservice.fetchProjectbyId(this.projectid).subscribe((data) => {
      this.projectData = data;
      console.log(this.projectData);
      this.projectMangerId = this.projectData.projectManager_id;
      this.delivaryManagerId = this.projectData.deliveryManager_id;
      this.getProjectmangerDetails();
      this.getDeliveryManagerDetails();
    });
  }

  // Redirecting to the project list page
  close() {
    this.sharedService.setViewMore(false);
    this.router.navigate(['pages-body/projectBoard']);
  }

  fetchResourceList() {
    try {
      this.spinner.show();
      this.projectdashboardservice.fetchResourceList(this.projectid).subscribe((data) => {
        this.resourceData = data;
        if (Array.isArray(this.resourceData)) { // Check if resourceData is an array
          this.resource_names = this.resourceData.map((resource: resourceDataModel) => resource.resourceName); // Update the mapping function
          this.resource_count = this.resourceData.length;
        }
        console.log(this.resourceData);
        this.spinner.hide();
      });
    }
    catch(error){
      console.log("error", error)
    }
  }

  getCriticalityClass() {
    switch (this.projectData?.criticality_id) {
      case 1: return 'High';
      case 2: return 'Medium';
      case 3: return 'Low';
      default: return '';
    }
  }

  getProjectmangerDetails(){
    this.projectdashboardservice.getProjectManagerById(this.projectMangerId).subscribe(res => {
      this.managerDetails = res;
    });
  }

  getDeliveryManagerDetails(){
    this.projectdashboardservice.getProjectManagerById(this.delivaryManagerId).subscribe(res => {
      this.delivaryManagerDetails = res;
    });
  }
}
