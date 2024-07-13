import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SidebarheaderServiceService } from '../side-bar-header-service/sidebarheader-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-side-bar-header',
  templateUrl: './side-bar-header.component.html',
  styleUrl: './side-bar-header.component.css'
})
export class SideBarHeaderComponent implements OnInit, OnDestroy{

  //
  selectedButton: string | null = null;
  private logoutSubscription!: Subscription;
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
      setTimeout(() => {
      this.selectedButton = name;
      });
    });

    this.subcriptioSidebarctive = this.sidebarHeaderService.sidebarActive$.subscribe(() => {
      setTimeout(() => {
      this.togglrSidebar();
      });
    });

    this.logoutSubscription = this.sidebarHeaderService.getLogoutEvent().subscribe(() => {
      this.selectedButton = null;
    });

  }
  ngOnDestroy(): void {
    this.headerNameSubscription.unsubscribe();
    if (this.logoutSubscription) {
      this.logoutSubscription.unsubscribe();
    }
  }

  rotating: boolean = false;

  rotateText() {
    this.rotating = true;
    // Refresh the system after the animation completes
    this.sidebarHeaderService.refreshSystem();
    // Reset rotation after animation completes
    setTimeout(() => {
      this.rotating = false;
    }, 1000); // Adjust this time to match your CSS animation duration
  }
}
 