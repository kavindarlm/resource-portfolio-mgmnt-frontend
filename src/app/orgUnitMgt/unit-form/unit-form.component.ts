import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrganizationalUnitModel } from './unit-form.model';
import { HttpClient } from '@angular/common/http';
import { OrgUnitMgtService } from '../../shared/orgUnitMgt_services/orgUnitMgt.service';
import { catchError, throwError } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrl: './unit-form.component.css'
})
export class UnitFormComponent implements OnInit{

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
    (error) => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  );
  }

  sendData(data: OrganizationalUnitModel) {
    console.log(data);

    const dataToSend = this.unitForm.value;
    this.orgUnitMgtService.createOrgUnit(data)
    .pipe(
      catchError((error) => {
        console.error('Error creating unit:', error);
        return throwError('Error creating resource');
      })
    )
    .subscribe((res => {
      console.log(data);
    }))
  }
}
