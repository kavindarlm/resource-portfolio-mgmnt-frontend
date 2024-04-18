import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { FunctionModel } from '../dashboard-model/functionModel';
import { SharedService } from '../admin-dashboard-services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-function-management',
  templateUrl: './function-management.component.html',
  styleUrl: './function-management.component.css',
})
export class FunctionManagementComponent implements OnInit, OnDestroy {

  constructor(private dashboardService: DashboardService, public sharedService: SharedService, private spinner: NgxSpinnerService) { }

  functionData: undefined | FunctionModel[];
  functionIds1: number[] = [];
  subscription!: Subscription;

  ngOnInit(): void {
    this.getAllFunctions();

    this.subscription = this.sharedService.functionIds$.subscribe(ids => {
      this.functionIds1 = ids;
      return this.functionIds1;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Function to get all the functions
  async getAllFunctions() {
    try {
      this.spinner.show();
      await this.dashboardService.getFunction().subscribe(res => {
        this.functionData = res;
        this.spinner.hide();
      });
    } catch (error) {
      console.error('Error getting functions:', error);
    }
  }

  functionIds: number[] = []; //for store the fuc_id as array

  // Function to handle the click event of the function button
  handleClick(function_id: number) {
    // console.log(this.functionIds1);

    if (this.functionIds1.includes(function_id)) {
      // If function_id is in functionIds1, remove it
      const index = this.functionIds1.indexOf(function_id);
      this.functionIds1.splice(index, 1);
    } else {
      // If function_id is not in functionIds1, add it
      this.functionIds1.push(function_id);
    }

    // Update functionIds1 in sharedService
    this.sharedService.updateFunctionIds(this.functionIds1);
  }
}
