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

  getuserIdFromrout() {
    this.activeRoutData.paramMap.subscribe((param: Params) => {
      this.userid = param['get']('id');
      console.log(this.userid);
    })
  }

  getUserDetail() {
    this.dashboardService.getSingleUser(this.userid).subscribe((data: UserModel) => {
      this.userForm = data;
    })
  }
  editUserDetail() {
    this.dashboardService.editUser(this.userid, this.userForm).subscribe((res) => {
      console.log(res);
      this.router.navigate(['admin-dashboard']);
    });
  }

  deleteUserDetail() {
    this.dashboardService.deleteUser(this.userid).subscribe((res) => {
      console.log(res);
      this.router.navigate(['admin-dashboard']);
    });
  }

} 
