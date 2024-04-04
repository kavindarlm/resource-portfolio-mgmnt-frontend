import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserModel } from '../dashboard-model/userModel';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner'; // for spinner

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  constructor(private router: Router, private dashboardService: DashboardService, private spinner: NgxSpinnerService) { }

  usersData: undefined | UserModel[];

  ngOnInit(): void {
    this.getAllUsers();
  }
  async getAllUsers() {
    try {
      this.spinner.show();
      await (await this.dashboardService.getUser()).subscribe(res => {
        this.usersData = res;
        this.spinner.hide();
      });
    } catch (error) {
      console.log("error", error)
    }
  }

}
