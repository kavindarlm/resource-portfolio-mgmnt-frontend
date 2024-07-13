import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserModel } from '../dashboard-model/userModel';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner'; // for spinner
import { SharedService } from '../admin-dashboard-services/shared.service';
import { Subscription, catchError } from 'rxjs';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService,
    private refreshData: SidebarheaderServiceService
  ) {}

  usersData: undefined | UserModel[];
  searchText: string = '';
  error: any;
  private subscription!: Subscription;
  currentPage = 1;
  itemsPerPage = 8;
  totalPages!: number;
  selectedRole: string = 'User';
  isClicked: boolean = false;

  ngOnInit(): void {
    this.subscription = this.sharedService.refreshUserList$.subscribe(() => {
      this.onRoleChange(this.selectedRole);
    });
    
    // Refresh the system after the animation completes
    this.refreshData.refreshSystem$.subscribe(() => {
      this.onRoleChange(this.selectedRole);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onRoleChange(role: string) {
    this.selectedRole = role;
    if (this.selectedRole === 'User') {
      this.getAllUsers();
    } else if (this.selectedRole === 'Admin') {
      this.getAllAdmins();
    }
  }

  async getAll() {
    try {
      this.spinner.show();
      await (
        await this.dashboardService.getUser()
      ).subscribe((res) => {
        this.usersData = res;
        this.totalPages = Math.ceil(this.usersData.length / this.itemsPerPage);
        this.spinner.hide();
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async getAllUsers() {
    try {
      this.spinner.show();
      await (
        await this.dashboardService.getAllUsers()
      ).subscribe((res) => {
        this.usersData = res;
        this.totalPages = Math.ceil(this.usersData.length / this.itemsPerPage);
        this.spinner.hide();
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  async getAllAdmins() {
    try {
      this.spinner.show();
      await (
        await this.dashboardService.getAllAdmins()
      ).subscribe((res) => {
        this.usersData = res;
        this.totalPages = Math.ceil(this.usersData.length / this.itemsPerPage);
        this.spinner.hide();
      });
    } catch (error) {
      console.log('error', error);
    }
  }

  addNewUser() {
    this.sharedService.setAddNewUserClicked(true);
    this.sharedService.updateFunctionIds([]);
  }

  //Search Users
  onSearchChange() {
    this.dashboardService
      .searchUser(this.searchText)
      .pipe(
        catchError((error) => {
          this.error = error; // Assign error to the variable for display
          return []; // Return empty array to prevent further processing
        })
      )
      .subscribe((res: UserModel[]) => {
        this.usersData = res;
      });
  }
}
