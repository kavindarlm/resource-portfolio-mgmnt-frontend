import { Component } from '@angular/core';
import { AvailabiilityComponent } from '../availabiility/availabiility.component';

@Component({
  selector: 'app-available-resource-list',
  templateUrl: './available-resource-list.component.html',
  styleUrl: './available-resource-list.component.css'
})
export class AvailableResourceListComponent {

  headArray=['Resource_ID','Team','Job_Role','Org_Unit','Availability'];

  resources = [
    { Resource_ID: '0011R', Team: 'Team 01', Job_Role: 'UX/UI Designer', Org_Unit: 'TAPRO', Availability: 'y' },
    { Resource_ID: '0022Y', Team: 'Team 01', Job_Role: 'UX/UI Designer', Org_Unit: 'DirectFN', Availability: 'y' },
    { Resource_ID: '0022H', Team: 'Team 03', Job_Role: 'UX/UI Designer', Org_Unit: 'DirectFN', Availability: 'y' },
    { Resource_ID: '0022G', Team: 'Team 02', Job_Role: 'UX/UI Designer', Org_Unit: 'TAPRO', Availability: 'y' }
  ];

  teams: string[] = ['Team 01', 'Team 02', 'Team 03'];
  OrgUnit: string[] = ['TAPRO', 'DirectFN'];

  
}
