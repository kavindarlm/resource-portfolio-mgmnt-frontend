import { Component, Input, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrl: './unit-details.component.css'
})
export class UnitDetailsComponent implements OnInit{
  @Input() unit: OrganizationalUnitModel | undefined;

  showUnitEditForm: boolean = false;

  ngOnInit(): void {
    console.log(this.unit);
  }

  onEdit() {
    this.showUnitEditForm = true;
  }
}
