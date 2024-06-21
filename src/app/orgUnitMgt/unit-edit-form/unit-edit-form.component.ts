import { Component, Input, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unit-edit-form',
  templateUrl: './unit-edit-form.component.html',
  styleUrl: './unit-edit-form.component.css'
})
export class UnitEditFormComponent implements OnInit {

  showForm: boolean = true;
  unitForm !: FormGroup;
  orgunits: OrganizationalUnitModel[] | undefined;
  selectedUnit: any;

  constructor(private http: HttpClient,private formBuilder: FormBuilder,
              private orgUnitMgtService: OrgUnitMgtService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toaster: ToastrService) {}

  ngOnInit(): void {
    this.loadOrgUnits();


    this.unitForm = this.formBuilder.group ({
      unitName: [''],
      parentId:[''],
      description: ['']
    });

    this.selectedUnit = this.orgUnitMgtService.getData();
    console.log('Selected Unit:', this.selectedUnit);
    this.setFormData();
  }

  setFormData() {
    this.unitForm.patchValue({
      unitName: this.selectedUnit.unitName,
      parentId: this.selectedUnit.parentId,
      description: this.selectedUnit.description
    });
  }

  loadOrgUnits() {
    this.spinner.show();
    this.orgUnitMgtService.getOrgUnits()
    .pipe(
      catchError((error) => {
        console.error('Error fetching org units:', error);
        alert('An error occurred while fetching org units. Please try again.');
        return throwError('Error fetching org units');
      })
    )
    .subscribe((res: any) => {
      debugger;
      this.orgunits = res;
      this.spinner.hide();
    },
    (error: any) => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  );
  }

  onEditUnit(data: OrganizationalUnitModel) {
    console.log(data);
    this.orgUnitMgtService.updateOrgUnit(this.selectedUnit.unitId, data)
      .subscribe(
        (res: any) => {
          console.log('Unit updated successfully:', res);
          // alert('Unit updated successfully');
          this.editSucceseMassege(this.selectedUnit.unitName);
          this.unitForm.reset();
          this.orgUnitMgtService.unitListUpdated.emit(); // Emit the event
          this.router.navigate(['pages-body/unit-list']);
        },
        (error) => {
          console.error('Error occurred while updating unit:', error);
        }
      );
  }

  //Edit Success Message
  editSucceseMassege(unitName: string) {
    this.toaster.success(
      `${unitName} Updated successfully`,
      'Unit Updated Successfully',
      { timeOut: 3000 }
    );
  }

  onCancel() {
    this.router.navigate(['pages-body/unit-list']);
  }
}
