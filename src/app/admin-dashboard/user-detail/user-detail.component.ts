import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Console } from 'console';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { UserModel } from '../dashboard-model/userModel';
import { SharedService } from '../admin-dashboard-services/shared.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersFunctionModel } from '../dashboard-model/usersFunctionModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  constructor(private activeRoutData: ActivatedRoute, private dashboardService: DashboardService, private router: Router, private sharedService: SharedService, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  public userid!: number;
  private subscription!: Subscription;
  public functionIds!: number[];

  userForm: UserModel =
    {
      user_name: '',
      user_email: '',
      user_role: '',
      user_id: 0
    };

  functionForm: UsersFunctionModel = {
    user_id: 0,
    functionIds: []
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
        // console.log(this.userid);
        this.getUserDetail();
        this.getUserFunctions();
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
        console.log(this.userForm.user_id);
        this.spinner.hide();
      })
    } catch (error) {
      console.error('Error getting user details:', error);
    }
  }

  // Function to edit the user details
  // editUserDetail() {
  //   if(confirm('Are you sure you want to edit this user?')){
  //   this.dashboardService.editUser(this.userid, this.userForm).subscribe((res) => {
  //     console.log(res);
  //     this.sharedService.refreshUserList();
  //     this.editUserFunctions();
  //   });}
  //   else{
  //     this.getUserFunctions();
  //   }
  // }

  editUserDetail() {
    if (confirm('Are you sure you want to edit this user?')) {
      this.dashboardService.editUser(this.userid, this.userForm).subscribe(
        (res) => {
          // console.log(res);
          this.sharedService.refreshUserList();
          this.editUserFunctions();
        },
        (error) => { // Error handling logic here
          if (error.error.message === 'Email already exists') {
            alert('Email already exists');
          } else {
            console.error(error.error.message);
          }
        }
      );
    } else {
      this.getUserFunctions();
    }
  }

  // Function to check the user details before the delete
  deleteUserDetail() {
    this.dashboardService.isAdmin(this.userid).subscribe(isAdmin => {
      if (isAdmin) {
        this.dashboardService.getAdminCount().subscribe(adminCount => {
          if (Number(adminCount) > 1) {
            this.deleteUser();
          } else {
            console.error('Cannot delete the only admin');
            this.cantDelete();
          }
        });
      } else {
        this.deleteUser();
      }
    });
  }
  
  // Function to delete the user
  deleteUser() {
    if (confirm('Are you sure you want to delete this user?')) {
      this.dashboardService.deleteUser(this.userid).subscribe(
        (res) => { // Success callback
          console.log(res);
          this.sharedService.refreshUserList();
          this.deleteSuccess(this.userForm.user_name);
          this.router.navigate(['/admin-dashboard']);
        },
        (err) => { // Error callback
          console.error('Error deleting user:', err);
          // Handle the error here. For example, you could show an error message to the user.
        }
      );
    }
  }

  // function to get the user functions
  getUserFunctions() {
    this.dashboardService.getUserFunction(this.userid).subscribe((data: UsersFunctionModel) => {
      this.functionForm = data;
      this.functionIds = data.functionIds;
      this.sharedService.updateFunctionIds(this.functionIds);
      this.sharedService.setFunctionIds1(this.functionIds);
    });
  }
  // Function to edit the user functions
  editUserFunctions() {
    this.subscription = this.sharedService.functionIds1$.subscribe(ids => {
      this.functionForm.functionIds = ids;
      this.dashboardService.editUserFunction(this.userid, this.functionForm).subscribe((data: UsersFunctionModel) => {
        this.functionForm = data;
        this.sharedService.refreshUserList();
        this.editSuccess(this.userForm.user_name);
        this.router.navigate(['/admin-dashboard']);
      });
    });
  }

  // Function to Delete success message
  deleteSuccess(username: string) {
    this.toastr.success(`${username} Delete successfully`, 'Deleted User', {
      timeOut: 3000,
    });
  }

  // Function to Edit success message
  editSuccess(username: string) {
    this.toastr.success(`${username} Edit successfully`, 'Edited User', {
      timeOut: 3000,
    });
  }

  // Function to show error message when trying to delete the only admin
  cantDelete() {
    this.toastr.error('Cannot delete the only admin', 'Error', {
      timeOut: 3000,
    });
  }
}

