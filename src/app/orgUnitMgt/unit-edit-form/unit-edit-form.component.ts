import { Component, Input, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';

@Component({
  selector: 'app-unit-edit-form',
  templateUrl: './unit-edit-form.component.html',
  styleUrl: './unit-edit-form.component.css'
})
export class UnitEditFormComponent implements OnInit {

  unitForm !: FormGroup;
  orgunits: OrganizationalUnitModel[] | undefined;
  selectedUnit: any;

  constructor(private http: HttpClient,private formBuilder: FormBuilder, private orgUnitMgtService: OrgUnitMgtService) {}

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
    },
    (error: any) => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  );
  }
}
