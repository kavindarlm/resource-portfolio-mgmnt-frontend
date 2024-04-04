import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { UserModel } from '../dashboard-model/userModel';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner'; // for spinner
import { SpinnerComponent } from '../../spinner/spinner/spinner.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  constructor (private router: Router , private dashboardService : DashboardService,private spinner: NgxSpinnerService){}

  usersData : undefined| UserModel[];

  ngOnInit(): void {
    this.getAllUsers();
  }

  // getAllUsers(){
  //   // this.dashboardService.getUser().subscribe(res=>{
  //   //   this.usersData = res;
  //   // });
  //   try{
  //     this.spinner.show();
  //     console.log("spinner works")
  //     this.dashboardService.getUser().subscribe(res=>{
  //       this.usersData = res;
  //       this.spinner.hide();
  //     });
  //   }finally{
  //     this.spinner.hide();
  //   }
  // } 
  async getAllUsers(){
    try{
      this.spinner.show();
      console.log("spinner works")
      await (await this.dashboardService.getUser()).subscribe(res=>{
        this.usersData = res;
      });
    } catch(error){
      console.log("error",error)
    }
    finally{
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
    }
  } 

}
