import { Component } from '@angular/core';
import { ServiceService } from '../shared/service.service';


@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrl: './resource-table.component.css'
})
export class ResourceTableComponent {
 
  selectedResources: any[] = []; // Array to store selected resources -new
  resources:any=[
    {
      resourceId: 1,
      resourceName: 'Resource 1',
      role: 'Developer',
      OrgUnit: 'Org 1'
    },
    {
      resourceId: 2,
      resourceName: 'Resource 2',
      role: 'Developer',
      OrgUnit: 'Org 2'
    },
    {
      resourceId: 3,
      resourceName: 'Resource 3',
      role: 'Developer',
      OrgUnit: 'Org 3'
    },
    {
      resourceId: 4,
      resourceName: 'Resource 4',
      role: 'Developer',
      OrgUnit: 'Org 4'
    },
    {
      resourceId: 5,
      resourceName: 'Resource 5',
      role: 'Developer',
      OrgUnit: 'Org 5'
    },
    {
      resourceId: 6,
      resourceName: 'Resource 6',
      role: 'Developer',
      OrgUnit: 'Org 6'
    },
    {
      resourceId: 7,
      resourceName: 'Resource 7',
      role: 'Developer',
      OrgUnit: 'Org 7'
    },
    {
      resourceId: 8,
      resourceName: 'Resource 8',
      role: 'Developer',
      OrgUnit: 'Org 8'
    },
    {
      resourceId: 9,
      resourceName: 'Resource 9',
      role: 'Developer',
      OrgUnit: 'Org 9'
    },
    {
      resourceId: 10,
      resourceName: 'Resource 10',
      role: 'Developer',
      OrgUnit: 'Org 10'
    }
  ]

  constructor(private service: ServiceService) {}

  onSelect(resource: any) {
    this.service.addSelectedResource(resource);
    //change the color of the selected row
    const index = this.selectedResources.indexOf(resource);

    // If not selected, add to the array; otherwise, remove it
    if (index === -1) {
      this.selectedResources.push(resource);
    } else {
      this.selectedResources.splice(index, 1);
    }
  }

  isSelected(resource: any): boolean {
    // Check if the resource is in the selectedResources array
    return this.selectedResources.includes(resource);
  }

  //new code -search bar
  searchtext:any;
  


}
