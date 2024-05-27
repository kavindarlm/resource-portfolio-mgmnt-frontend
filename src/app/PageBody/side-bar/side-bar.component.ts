import { Component, Input, OnInit} from '@angular/core';
import { SidebarheaderServiceService } from '../side-bar-header-service/sidebarheader-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../../admin-dashboard/admin-dashboard-services/shared.service';
import { DashboardService } from '../../admin-dashboard/admin-dashboard-services/dashboard.service';
import { UsersFunctionModel } from '../../admin-dashboard/dashboard-model/usersFunctionModel';
import { FunctionModel } from '../../admin-dashboard/dashboard-model/functionModel';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})

export class SideBarComponent implements OnInit{

  user_id: any;
  functionIds: number[] = [];

  constructor(private router: Router,private sidebarHeaderService: SidebarheaderServiceService,private sharedService: SharedService,private dashboardService: DashboardService){}

  functionData: undefined | FunctionModel[];

  ngOnInit(): void {
    // Get the user ID from local storage when the component is initialized
    this.user_id = localStorage.getItem('userId');

    // Get the function IDs
    this.dashboardService.getUserFunction(this.user_id).subscribe((data: UsersFunctionModel) =>{
      this.functionIds = data.functionIds;
    });

    // Get the function data
    this.dashboardService.getFunction().subscribe((data: FunctionModel[]) => {
      this.functionData = data;
      console.log('Function data:', this.functionData); // Log the function data to the console
    });
  }

  // Function to set the header name and sidebar active
  selectHeaderName(name:string){
    this.sidebarHeaderService.setHeaderName(name);
    this.sidebarHeaderService.setSidebarActive();
  }

  @Input() sidebarActivee: boolean = false;

  functionNamesToIds = {
    'PROJECT DASHBOARD': 1,
    'RESOURCE MANAGEMENT': 2,
    'ORGANIZATION UNIT MANAGEMENT': 3,
    'CALENDAR MANAGEMENT': 4,
    'TEAM MANAGEMENT': 5,
    'PROJECT MANAGEMENT': 6,
    'UPDATE TASK PROGRESS': 7,
    'SPRINT MANAGEMENT': 8,
    'HANDLE REQUEST RESOURCES': 9
  };
}
 