import { Component, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
// import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css',
})
export class UnitListComponent implements OnInit {
  showForm = false;
  orgunits: OrganizationalUnitModel[] | undefined;
  selectedUnit: OrganizationalUnitModel | undefined;
  searchText: any;
  constructor(
    private orgUnitMgtService: OrgUnitMgtService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private refreshData :SidebarheaderServiceService
  ) {
    this.showForm = false;
  }

  ngOnInit(): void {
    this.loadOrgUnits();

    // Subscribe to the resourceAdded event
    this.orgUnitMgtService.unitListUpdated.subscribe(() => {
      this.loadOrgUnits(); // Reload resource list when a new resource is added
    });

    // Subscribe to the refreshSystem event
    this.refreshData.refreshSystem$.subscribe(() => {
      this.loadOrgUnits(); // Reload resource list when a new resource is added
    });
  }

  showcomponent() {
    this.showForm = !this.showForm;
  }

  loadOrgUnits() {
    this.spinner.show();
    this.orgUnitMgtService.getOrgUnits().subscribe((res) => {
      this.orgunits = res;
      this.spinner.hide();
    });
  }

  showUnitDetails(unit: OrganizationalUnitModel): void {
    this.selectedUnit = unit;
    this.orgUnitMgtService.setData(this.selectedUnit);
    this.orgUnitMgtService.refreshUnitfetchData();
  }
}
