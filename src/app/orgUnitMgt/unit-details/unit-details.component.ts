import { Component, Input, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrgUnitRecrsive } from '../unit-tree/org-unitmodel';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrl: './unit-details.component.css'
})
export class UnitDetailsComponent implements OnInit{
  @Input()
  unit!: OrganizationalUnitModel;
  OrgUnitid: number | undefined;
  ParentUnit!: OrgUnitRecrsive[];

  showUnitEditForm: boolean = false;

  // ancestors: OrganizationalUnitModel[] = [];

  constructor(private orgUnitMgtService: OrgUnitMgtService,
              private route: ActivatedRoute,
              private router: Router,
              private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    // console.log(this.unit);
    // this.OrgUnitid= this.unit.unitId;
    // this.getParentOrgUnitsByUnitId(this.OrgUnitid);

    // if (this.unit) {
    //   // this.loadAncestors(this.unit.unitId);
    //   console.log('Unit details:', this.unit);
    // }

    //After adding routing
    this.route.params.subscribe(params => {
      const unitId = +params['id']; // Retrieve unit ID from route parameters
      if (unitId) {
        this.loadUnitDetails(unitId);
      }
    });
  }

  loadUnitDetails(unitId: number) {
    this.orgUnitMgtService.getOrgUnitById(unitId).subscribe(unit => {
      this.unit = unit;
      this.OrgUnitid = unit.unitId;
      this.getParentOrgUnitsByUnitId(this.OrgUnitid);
    });
  }

  onEdit() {
    this.showUnitEditForm = true;
  }

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

  //get all the parent units belong to the org unitId
  getParentOrgUnitsByUnitId(unitId: number) {
    this.orgUnitMgtService.getOrgUnitRecursiveData(unitId).subscribe(res => {
      this.ParentUnit = res;
      console.log(this.ParentUnit);
    });
  }

}

