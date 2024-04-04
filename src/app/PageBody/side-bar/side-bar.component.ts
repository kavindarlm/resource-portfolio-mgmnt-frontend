import { Component, Input, OnInit} from '@angular/core';
import { SidebarheaderServiceService } from '../side-bar-header-service/sidebarheader-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  constructor(
    private router: Router,
    private sidebarHeaderService: SidebarheaderServiceService
  ){}
  ngOnInit(): void {
  }
  selectHeaderName(name:string){
    this.sidebarHeaderService.setHeaderName(name);
    switch (name) {
      case 'SPRINT MANAGEMENT':
        // this.router.navigateByUrl('/sprint-management');
        break;
      case 'HANDLE REQUEST RESOURCES':
        // this.router.navigateByUrl('/sprint-mgt');
        break;
      // Add more cases for other buttons if needed
      default:
        // Navigate to a default component or do nothing
        break; 
    }
  }

  @Input() sidebarActivee: boolean = false;
}
 