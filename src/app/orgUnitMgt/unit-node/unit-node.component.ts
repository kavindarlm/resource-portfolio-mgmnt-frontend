import { Component, Input } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';

@Component({
  selector: 'app-unit-node',
  templateUrl: './unit-node.component.html',
  styleUrl: './unit-node.component.css'
})
export class UnitNodeComponent {
  @Input() node: OrganizationalUnitModel[] | undefined;
}
