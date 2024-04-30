import { Component } from '@angular/core';
import { AvailabiilityComponent } from '../availabiility/availabiility.component';

@Component({
  selector: 'app-available-resource-list',
  templateUrl: './available-resource-list.component.html',
  styleUrl: './available-resource-list.component.css'
})
export class AvailableResourceListComponent {

  headArray=['Resource_ID','Team','Job_Role','Org_Unit','Availability'];

  resources: any[] = [];

  constructor( ) { }

  ngOnInit(): void {
    
  }

  teams: string[] = ['Development Team A', 'Quality Assurance Team', 'Product Management Team'];
  OrgUnit: string[] = ['Development', 'Quality Assurance','Product Management'];

  
}
