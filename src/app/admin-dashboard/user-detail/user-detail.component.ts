import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Console } from 'console';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { UserModel } from '../dashboard-model/userModel';
import { SharedService } from '../admin-dashboard-services/shared.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  constructor(private activeRoutData: ActivatedRoute, private dashboardService: DashboardService, private router: Router, private sharedService: SharedService, private spinner: NgxSpinnerService) { }

  public userid!: number;
  private subscription!: Subscription;

  userForm: UserModel =
    {
      user_name: '',
      user_email: '',
      user_id: 0
    };

  ngOnInit(): void {
    this.getuserIdFromrout();
    this.getUserDetail();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  // Function to get the user_id from the route
  async getuserIdFromrout() {
    try {
      this.activeRoutData.paramMap.subscribe((param: Params) => {
        this.userid = param['get']('id');
        console.log(this.userid);
        this.getUserDetail();
      })
    } catch (error) {
      console.error('Error getting user ID from route:', error);
    }
  }


  // Function to get the user details by user_id
  async getUserDetail() {
    try {
      this.spinner.show();
      await this.dashboardService.getSingleUser(this.userid).subscribe((data: UserModel) => {
        this.userForm = data;
        this.spinner.hide();
      })
    } catch (error) {
      console.error('Error getting user details:', error);
    }
  }

  // Function to edit the user details

  editUserDetail() {
    this.dashboardService.editUser(this.userid, this.userForm).subscribe((res) => {
      console.log(res);
      this.sharedService.refreshUserList();
    });
  }

  // Function to delete the user details
  deleteUserDetail() {
    this.dashboardService.deleteUser(this.userid).subscribe((res) => {
      console.log(res);
      this.sharedService.refreshUserList();
      this.router.navigate(['/admin-dashboard']);
    });
  }

} 
