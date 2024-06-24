import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-responsive-tree',
  templateUrl: './responsive-tree.component.html',
  styleUrl: './responsive-tree.component.css'
})
export class ResponsiveTreeComponent {
  @Input() node: any;
  showChildren: boolean = false;

  toggleChildren() {
    this.showChildren = !this.showChildren;
  }
}
