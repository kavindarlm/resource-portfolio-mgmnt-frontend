import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../admin-dashboard/admin-dashboard-services/dashboard.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ProjectDashboardService } from '../services/projectDashboard.service';
import { projectDataModel } from '../projct-dshbrd-model/dshbrd-project';
import { DashbrdSharedService } from '../services/dshbrdshared.service';

@Component({
  selector: 'app-dashbrd-project-details',
  templateUrl: './dashbrd-project-details.component.html',
  styleUrl: './dashbrd-project-details.component.css'
})
export class DashbrdProjectDetailsComponent implements OnInit {
  public projectid!: string;
  projectData: undefined| projectDataModel;
  isviewMoreClicked = true;

  constructor(private projectdashboardservice: ProjectDashboardService, private activatedRoute: ActivatedRoute, private router: Router, private sharedService :DashbrdSharedService){}

  names = ['John doe', 'John doe', 'John doe', 'John doe', 'John doe', 'John doe', 'John doe', 'John doe', 'John doe', 'John doe', 'John doe', 'John doe'];
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      this.projectid = param['get']('id');
      this.fetchProject();
    });
  }
  // Fetching the project details
  fetchProject() {
    this.projectdashboardservice.fetchProjectbyId(this.projectid).subscribe((data) => {
      this.projectData = data;
    });
  }

  // Redirecting to the project list page
  close(){
    this.sharedService.setViewMore(false);
    this.router.navigate(['pages-body/projectBoard']);
  }
}
