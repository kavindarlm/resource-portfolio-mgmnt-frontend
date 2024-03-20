import { Component } from '@angular/core';
import { AvailableResourceListComponent } from '../available-resource-list/available-resource-list.component';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {

  months: string[] = [
    'Select Month',
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  days: number[] = Array.from({ length: 31 }, (_, index) => index + 1);

  years: number[] = Array.from({ length: 6 }, (_, index) => new Date().getFullYear() + index);

  headArray=['Resource_ID','Team','Job_Role','Org_Unit','Availability'];

  resources = [

  ];

  comp:any ;
  detectCom(comp:any){
    if(comp === "availableResourceList"){
      this.comp = AvailableResourceListComponent;
  }


 
}

}