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
    this.generateNavigationList(this.unit);
  }

  onEdit() {
    this.showUnitEditForm = true;
  }

  // generateNavigationList(unit: OrganizationalUnitModel) {
  //   this.navigationList.unshift(unit);
  //   if (unit.parentId) {
  //     this.orgUnitMgtService.getOrgUnitById(unit.parentId)
  //       .subscribe((parentUnit: OrganizationalUnitModel) => {
  //         this.generateNavigationList(unit.parentUnit);
  //       });
  //   }
  // }

  generateNavigationList(unit: OrganizationalUnitModel) {
    this.navigationList.unshift(unit);
    if (unit.parentId) {
      this.orgUnitMgtService.getOrgUnitById(unit.parentId)
        .subscribe((parentUnit: OrganizationalUnitModel) => {
          this.generateNavigationList(parentUnit);
        });
    }
    console.log(this.navigationList);
}

  onDeleteUnit() {
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
