import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidebarheaderServiceService } from '../side-bar-header-service/sidebarheader-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-side-bar-header',
  templateUrl: './side-bar-header.component.html',
  styleUrl: './side-bar-header.component.css'
})
export class SideBarHeaderComponent implements OnInit{

  //
  selectedButton: string | null = null;
  private headerNameSubscription!: Subscription;
  private subcriptioSidebarctive!: Subscription;
  @Input() sidebarActive: boolean = false;
  @Output() sidebarToggled = new EventEmitter<void>();


  togglrSidebar() {
    this.sidebarToggled.emit();
  }

  constructor(private sidebarHeaderService: SidebarheaderServiceService){}
  ngOnInit(): void {
    this.headerNameSubscription = this.sidebarHeaderService.getHeaderName().subscribe((name: string) => {
      this.selectedButton = name;
    });

    this.subcriptioSidebarctive = this.sidebarHeaderService.sidebarActive$.subscribe(() => {
      this.togglrSidebar();
    });
  }
  ngOnDestroy(): void {
    this.headerNameSubscription.unsubscribe();
  }
}
 