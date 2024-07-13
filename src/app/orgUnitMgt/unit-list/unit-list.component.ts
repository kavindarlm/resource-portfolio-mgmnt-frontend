import { Component, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
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
  orgunits: OrganizationalUnitModel[] = [];
  filteredUnits: OrganizationalUnitModel[] = [];
  selectedUnit: OrganizationalUnitModel | undefined;
  searchText: string = '';
  currentPage = 1;
  itemsPerPage = 10; // Number of items per page
  totalPages = 1;

  constructor(
    private orgUnitMgtService: OrgUnitMgtService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private refreshData: SidebarheaderServiceService
  ) {
    this.showForm = false;
  }

  ngOnInit(): void {
    this.loadOrgUnits();

    // Subscribe to the unitListUpdated event
    this.orgUnitMgtService.unitListUpdated.subscribe(() => {
      this.loadOrgUnits(); // Reload unit list when a new unit is added
    });

    // Subscribe to the refreshSystem event
    this.refreshData.refreshSystem$.subscribe(() => {
      this.loadOrgUnits(); // Reload unit list when a new unit is added
    });
  }

  showcomponent() {
    this.showForm = !this.showForm;
  }

  loadOrgUnits() {
    this.spinner.show();
    this.orgUnitMgtService.getOrgUnits().subscribe((res) => {
      this.orgunits = res;
      this.applyFilters();
      this.spinner.hide();
    });
  }

  showUnitDetails(unit: OrganizationalUnitModel): void {
    this.selectedUnit = unit;
    this.orgUnitMgtService.setData(this.selectedUnit);
    this.orgUnitMgtService.refreshUnitfetchData();
  }

  // Method to filter data based on search text
  applyFilters() {
    this.filteredUnits = this.searchText
      ? this.orgunits.filter(unit =>
          unit.unitName.toLowerCase().includes(this.searchText.toLowerCase())
        )
      : this.orgunits;

    this.totalPages = Math.ceil(this.filteredUnits.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to the first page whenever filters are applied
  }

  // Method to get paginated units
  getPaginatedUnits(): OrganizationalUnitModel[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUnits.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Method to change page
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
