import { Component } from '@angular/core';
import { AvailabiilityComponent } from '../availabiility/availabiility.component';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-available-resource-list',
  templateUrl: './available-resource-list.component.html',
  styleUrl: './available-resource-list.component.css'
})
export class AvailableResourceListComponent {

  headArray=['Resource_ID','Team','Job_Role','Org_Unit','Availability'];

  resources: any[] = [];

  constructor(private resourceService: ResourceService ) { }

  ngOnInit(): void {
    this.fetchResources();
  }

  fetchResources(): void {
    this.resourceService.getResources().subscribe(
      (data: any[]) => {
        this.resources = data.map(resource => ({
          Resource_ID: resource.resource_id,
          Team: resource.team_name,
          Job_Role: resource.role_name,
          Org_Unit: resource.org_unit_name,
          Availability: 'y'  
        }));
        console.log('Resources:', this.resources);
      },
      error => {
        console.error('Error fetching resources:', error);
      }
    );
  }

  teams: string[] = ['Development Team A', 'Quality Assurance Team', 'Product Management Team'];
  OrgUnit: string[] = ['Development', 'Quality Assurance','Product Management'];

  
}
