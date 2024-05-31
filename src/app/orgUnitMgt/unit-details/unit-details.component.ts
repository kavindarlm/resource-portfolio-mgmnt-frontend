import { Component, Input, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  ancestors: OrganizationalUnitModel[] = [];

  constructor(private orgUnitMgtService: OrgUnitMgtService,
              private router: Router,
              private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.unit);
    // this.generateNavigationList(this.unit);
    // if (this.unit) {
    //   this.generateNavigationList(this.unit);
    // }

    if (this.unit) {
      this.loadAncestors(this.unit.unitId);
    }
  }

  onEdit() {
    this.showUnitEditForm = true;
  }

  loadAncestors(unitId: number) {
    this.orgUnitMgtService.getAncestors(unitId).subscribe(
      (data: OrganizationalUnitModel[]) => {
        this.ancestors = data;
        console.log("Ancestors :" , this.ancestors);
      },
      (error) => {
        console.error('Error fetching ancestors:', error);
      }
    );
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

    // onDeleteResource() {
  //   this.resourceService.deleteResource(this.selectedResource.resourceId)
  //   .subscribe((res:ResourceModel)=> {
  //     console.log('Resource deleted successfully:', res);
  //     this.deleteSucceseMassege(this.selectedResource.resourceId);
  //     this.formValue.reset();
  //     this.resourceService.resourceListUpdated.emit(); // Emit the event
  //     this.router.navigate(['pages-body/first-view']);
  //   },
  //   (error) => {
  //     console.error('Error occurred while deleting resource:', error);
  //     // Handle error appropriately, such as displaying an error message to the user.
  //   }
  //   );
  // }

  // //Delete Success Message
  // deleteSucceseMassege(unitName: string) {
  //   this.toaster.success(
  //     `${unitName} Deleted successfully`,
  //     'Unit Deleted Successfully',
  //     { timeOut: 3000 }
  //   );
  // }

}
