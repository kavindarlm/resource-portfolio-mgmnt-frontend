import { Component, OnInit } from '@angular/core';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { OrgUnit } from './org-unitmodel';
import { ScreenSizeService } from '../../shared/orgUnitMgt_services/screenSize.service';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';


@Component({
  selector: 'app-unit-tree',
  templateUrl: './unit-tree.component.html',
  styleUrl: './unit-tree.component.css'
})


export class UnitTreeComponent implements OnInit {

  Data: undefined | OrgUnit[] = [];
  isSmallScreen: boolean | undefined;

  ngOnInit(): void {
    this.fetchData();

    // Subscribe to the refreshSystem event
    this.refreshData.refreshSystem$.subscribe(() => {
      this.fetchData(); // Fetch data when a new unit is added
    });

    // Subscribe to the unitListUpdated event
    this.orgUnitMgtService.unitListUpdated.subscribe(() => {
      this.fetchData(); // Fetch data when a unit is added, updated or deleted
    });

    this.screenSizeService.isSmallScreen$.subscribe(isSmall => {
      this.isSmallScreen = isSmall;
    });
  }

  constructor(private orgUnitMgtService: OrgUnitMgtService,
    private screenSizeService: ScreenSizeService,
    private refreshData: SidebarheaderServiceService
  ) { }
  tr: any;
  fetchData(): void {
    this.orgUnitMgtService.getOrgUnitData().subscribe(
      (res) => {
        this.Data = res;
        console.log(this.Data);

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}

