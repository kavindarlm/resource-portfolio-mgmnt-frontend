import { Component, Input, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrl: './unit-details.component.css'
})
export class UnitDetailsComponent implements OnInit{
  @Input()
  unit!: OrganizationalUnitModel;

  showUnitEditForm: boolean = false;
  navigationList: OrganizationalUnitModel[] = [];


  constructor(private orgUnitMgtService: OrgUnitMgtService) {}

  ngOnInit(): void {
    console.log(this.unit);
    // this.generateNavigationList(this.unit);
  }

  onEdit() {
    this.showUnitEditForm = true;
  }



//   generateNavigationList(unit: OrganizationalUnitModel) {
//     this.navigationList.unshift(unit);
//     if (unit.parentId) {
//       this.orgUnitMgtService.getOrgUnitById(unit.parentId)
//         .subscribe((parentUnit: OrganizationalUnitModel) => {
//           this.generateNavigationList(parentUnit);
//         });
//     }
//     console.log(this.navigationList);
// }

// generateNavigationList(unit: OrganizationalUnitModel) {
//   this.navigationList.unshift(unit);
//   if (unit.parentId !== null && typeof unit.parentId !== 'undefined') {
//       this.orgUnitMgtService.getOrgUnitById(unit.parentId)
//           .subscribe((parentUnit: OrganizationalUnitModel) => {
//               this.generateNavigationList(parentUnit);
//           });
//   }
//   console.log(this.navigationList);
//   // Fetch ancestors recursively until reaching the root unit
//   this.fetchAncestors(unit.parentId);
// }

// fetchAncestors(parentId: number | null) {
//   if (parentId !== null && parentId !== undefined) {
//       this.orgUnitMgtService.getOrgUnitById(parentId)
//           .subscribe((parentUnit: OrganizationalUnitModel) => {
//               this.navigationList.unshift(parentUnit); // Add parent unit to the navigation list
//               this.fetchAncestors(parentUnit.parentId); // Recursively fetch ancestors
//           });
//   }
// }

  onDeleteUnit() {
      // Check if the unit has children units
    if (this.unit.children && this.unit.children.length > 0) {
      alert("If you want to delete this unit, you should edit or delete its child units first.");
      return; // Stop further execution
    }
    this.orgUnitMgtService.deleteOrgUnit(this.unit.unitId)
    .subscribe((res: OrganizationalUnitModel) => {
      console.log('Unit deleted successfully:', res);
      alert('Unit deleted successfully');
    },
    (error) => {
      console.error('Error occurred while deleting unit:', error);
    }
    
    );
  }

}
