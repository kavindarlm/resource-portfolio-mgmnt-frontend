import { Component, Input, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrgUnitRecrsive } from '../unit-tree/org-unitmodel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogService } from '../../ConfirmDialogBox/confirm-dialog.service';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrl: './unit-details.component.css'
})
export class UnitDetailsComponent implements OnInit {
  unit!: OrganizationalUnitModel;
  OrgUnitid: number | undefined;
  ParentUnit!: OrgUnitRecrsive[];

  showUnitEditForm: boolean = false;

  constructor(private orgUnitMgtService: OrgUnitMgtService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toaster: ToastrService,
    private confirmMessage: ConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const unitId = +params['id']; // Retrieve unit ID from route parameters
      if (unitId) {
        this.loadUnitDetails(unitId);
      }
    });
  }

  //Load org unit details
  loadUnitDetails(unitId: number) {
    this.spinner.show();
    this.orgUnitMgtService.getOrgUnitById(unitId).subscribe(unit => {
    this.unit = unit;
    this.OrgUnitid = unit.unitId;
    this.getParentOrgUnitsByUnitId(this.OrgUnitid);
    this.spinner.hide();
    });
  }

  //When edit button is clicked show the unit edit form component
  onEdit() {
    this.showUnitEditForm = true;
  }

  //To delete an org unit
  onDeleteUnit() {
    this.confirmMessage.open("Are you sure you want to delete this unit?").subscribe(confirmed => {
      if (confirmed){
        this.orgUnitMgtService.hasChildUnits(this.unit.unitId).subscribe(
          (hasChildren) => {
            console.log(hasChildren);
            //If the selected unit has child units
            if (hasChildren == true) {
              this.toaster.error("If you want to delete this unit, you should edit or delete its child units first.");
              //If the selected unit has no child units
            } else {
                this.orgUnitMgtService.deleteOrgUnit(this.unit.unitId).subscribe(
                  (response) => {
                    this.toaster.success("Unit Deleted Successfully");
                    this.orgUnitMgtService.unitListUpdated.emit(); // Emit the event
                    this.router.navigate(['pages-body/unit-list']);
                  },
                  (error) => {
                    if (error.status === 400) {
                      this.toaster.error(error.error.message);
                    } else {
                      this.toaster.error("Failed to delete the unit.");
                    }
                    console.error(error);
                  }
                );
            }
          },
          (error) => {
            this.toaster.error("Error checking for child units.");
            console.error(error);
          }
        );
      }
    })
    
  }
   
  //get all the parent units belong to the org unitId
  getParentOrgUnitsByUnitId(unitId: number) {
    this.orgUnitMgtService.getOrgUnitRecursiveData(unitId).subscribe(res => {
      this.ParentUnit = res.reverse();
      console.log(this.ParentUnit);
    });
  }

}

