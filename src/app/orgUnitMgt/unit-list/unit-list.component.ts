import { Component, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css'
})
export class UnitListComponent implements OnInit{
  showForm = false;
  orgunits : OrganizationalUnitModel[] | undefined;
  selectedUnit: OrganizationalUnitModel | undefined;
  constructor(private orgUnitMgtService: OrgUnitMgtService) {
    this.showForm=false;
  }

  ngOnInit(): void {
    this.loadOrgUnits();
  }

  showcomponent(){
    this.showForm = !this.showForm;
  }

  loadOrgUnits(){
    this.orgUnitMgtService.getOrgUnits().subscribe(res=>{
      this.orgunits = res;
    })
  }

  showUnitDetails(unit: OrganizationalUnitModel): void {
    this.selectedUnit = unit;
    this.orgUnitMgtService.setData(this.selectedUnit);
  }
  
}
