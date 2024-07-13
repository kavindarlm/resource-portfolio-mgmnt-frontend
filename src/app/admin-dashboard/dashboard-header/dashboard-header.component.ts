import { Component } from '@angular/core';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {
  constructor( private sidebarHeaderService: SidebarheaderServiceService){

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
