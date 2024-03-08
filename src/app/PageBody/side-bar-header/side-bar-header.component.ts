import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidebarheaderServiceService } from '../side-bar-header-service/sidebarheader-service.service';


@Component({
  selector: 'app-side-bar-header',
  templateUrl: './side-bar-header.component.html',
  styleUrl: './side-bar-header.component.css'
})
export class SideBarHeaderComponent implements OnInit{
  @Input() sidebarActive: boolean = false;
  @Output() sidebarToggled = new EventEmitter<void>();
  togglrSidebar() {
    this.sidebarToggled.emit();
  }
  selectedButton!: string;
  constructor(private sidebarService: SidebarheaderServiceService){}
  ngOnInit(): void {
      this.sidebarService.headername$.subscribe(name => {
        this.selectedButton = name;
      })
  }
}
 