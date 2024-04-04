import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Console } from 'console';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { UserModel } from '../dashboard-model/userModel';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  constructor(private activeRoutData: ActivatedRoute, private dashboardService: DashboardService, private router: Router) { }

  public userid!: number;

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

  // Function to get the user_id from the route
  getuserIdFromrout() {
    this.activeRoutData.paramMap.subscribe((param: Params) => {
      this.userid = param['get']('id');
      console.log(this.userid);
    })
  }

  // Function to get the user details by user_id
  getUserDetail() {
    this.dashboardService.getSingleUser(this.userid).subscribe((data: UserModel) => {
      this.userForm = data;
    })
  }

  // Function to edit the user details
  editUserDetail() {
    this.dashboardService.editUser(this.userid, this.userForm).subscribe((res) => {
      console.log(res);
      this.router.navigate(['admin-dashboard']);
    });
  }

  // Function to delete the user details
  deleteUserDetail() {
    this.dashboardService.deleteUser(this.userid).subscribe((res) => {
      console.log(res);
      this.router.navigate(['admin-dashboard']);
    });
  }

} 
