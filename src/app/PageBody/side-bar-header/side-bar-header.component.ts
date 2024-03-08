import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-side-bar-header',
  templateUrl: './side-bar-header.component.html',
  styleUrl: './side-bar-header.component.css'
})
export class SideBarHeaderComponent {
  @Input() sidebarActive: boolean = false;
  @Output() sidebarToggled = new EventEmitter<void>();
  togglrSidebar() {
    this.sidebarToggled.emit();
  }
  
}
 