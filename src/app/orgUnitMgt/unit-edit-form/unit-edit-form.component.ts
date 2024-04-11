import { Component } from '@angular/core';
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
export class UnitEditFormComponent {

  unitForm !: FormGroup;
  orgunits: OrganizationalUnitModel[] | undefined;

  constructor(private http: HttpClient,private formBuilder: FormBuilder, private orgUnitMgtService: OrgUnitMgtService) {}

  ngOnInit(): void {
    this.loadOrgUnits();

    this.unitForm = this.formBuilder.group ({
      unitName: [''],
      parentId:[''],
      description: ['']
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
