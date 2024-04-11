import { Component, Input, OnInit } from '@angular/core';
import { OrganizationalUnitModel } from '../unit-form/unit-form.model';

@Component({
  selector: 'app-unit-node',
  templateUrl: './unit-node.component.html',
  styleUrl: './unit-node.component.css'
})
export class UnitNodeComponent implements OnInit {
  // @Input() node: OrganizationalUnitModel[] | undefined;
  @Input() node: any;

  ngOnInit() {
    console.log(this.node);
  }
}
