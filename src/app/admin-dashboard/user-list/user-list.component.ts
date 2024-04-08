import { Component, OnInit,OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserModel } from '../dashboard-model/userModel';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner'; // for spinner
import { SharedService } from '../admin-dashboard-services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private dashboardService: DashboardService, private spinner: NgxSpinnerService ,private sharedService : SharedService) { }

  usersData: undefined | UserModel[];
  private subscription!: Subscription;
  currentPage = 1;
  itemsPerPage = 8;
  totalPages!: number;

  ngOnInit(): void {
    this.subscription = this.sharedService.refreshUserList$.subscribe(() => {
      this.getAllUsers();
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async getAllUsers() {
    try {
      this.spinner.show();
      await (await this.dashboardService.getUser()).subscribe(res => {
        this.usersData = res;
        this.totalPages = Math.ceil(this.usersData.length / this.itemsPerPage);
        this.spinner.hide();
      });
    } catch (error) {
      console.log("error", error)
    }
  }

}
