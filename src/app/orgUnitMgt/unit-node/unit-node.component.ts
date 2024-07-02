import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit-node',
  templateUrl: './unit-node.component.html',
  styleUrl: './unit-node.component.css'
})
export class UnitNodeComponent implements OnInit {

  @Input() node: any;

  ngOnInit() {

  }
}
