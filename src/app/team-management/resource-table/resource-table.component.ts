import { Component } from '@angular/core';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrl: './resource-table.component.css'
})
export class ResourceTableComponent {

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

}
