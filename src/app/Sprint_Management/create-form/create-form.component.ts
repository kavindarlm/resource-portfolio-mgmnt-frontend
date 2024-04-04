import { Component } from '@angular/core';
import { AvailableResourceListComponent } from '../available-resource-list/available-resource-list.component';
import { SprintManagementService } from '../../services/sprint-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {

  sprintName: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private sprintService: SprintManagementService , private router: Router) {}

  // months: string[] = [
  //   'Select Month',
  //   'January', 'February', 'March', 'April', 'May', 'June',
  //   'July', 'August', 'September', 'October', 'November', 'December'
  // ];

  // days: number[] = Array.from({ length: 31 }, (_, index) => index + 1);

  // years: number[] = Array.from({ length: 6 }, (_, index) => new Date().getFullYear() + index);

  headArray=['Resource_ID','Team','Job_Role','Org_Unit','Availability'];

  resources = [

  ];

//   comp:any ;
//   detectCom(comp:any){
//     if(comp === "availableResourceList"){
//       this.comp = AvailableResourceListComponent;
//   } 
// }

getSprintFormData(data: any) {
  console.warn(data);
  const sprintData = {
    Sname: this.sprintName,
    Start_Date: this.startDate,
    End_Date: this.endDate
  };

  this.sprintService.saveSprint(sprintData).subscribe(
    // response => {
    //   console.log('Sprint saved successfully:', response);
    // },
    // error => {
    //   console.error('Error saving sprint:', error);
    // }
  );
}
}