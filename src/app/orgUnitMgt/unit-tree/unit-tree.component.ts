import { Component, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
import { HttpClient } from '@angular/common/http';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { catchError, throwError } from 'rxjs';
import { error } from 'console';
import { OrgUnit } from './org-unitmodel';


@Component({
  selector: 'app-unit-tree',
  templateUrl: './unit-tree.component.html',
  styleUrl: './unit-tree.component.css'
})


export class UnitTreeComponent implements OnInit {

  Data: undefined | OrgUnit[] = [];


  ngOnInit(): void {
    this.fetchData();

    // Subscribe to the unitListUpdated event
    this.orgUnitMgtService.unitListUpdated.subscribe(() => {
      this.fetchData(); // Fetch data when a unit is added, updated or deleted
    });
  }

  constructor(private orgUnitMgtService: OrgUnitMgtService) { }
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

