import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { FunctionModel } from '../dashboard-model/functionModel';
import { SharedService } from '../admin-dashboard-services/shared.service';


@Component({
  selector: 'app-function-management',
  templateUrl: './function-management.component.html',
  styleUrl: './function-management.component.css',
})
export class FunctionManagementComponent implements OnInit {

  constructor(private router: Router, private dashboardService: DashboardService, private sharedService : SharedService) { }

  functionData: undefined | FunctionModel[];

  ngOnInit(): void {
    this.getAllFunctions();
  }

  // Function to get all the functions
  getAllFunctions() {
    this.dashboardService.getFunction().subscribe(res => {
      this.functionData = res;
    });
  }

  functionIds: number[] = []; //for store the fuc_id as array


  handleClick(function_id: number) {
    const index = this.functionIds.indexOf(function_id);
    if (index > -1) {
      // If func_id is already in the array, remove it
      this.functionIds.splice(index, 1);
    } else {
      // If func_id is not in the array, add it
      this.functionIds.push(function_id);
    }
    console.log(this.functionIds);
    this.sharedService.updateFunctionIds(this.functionIds);
  }

}
