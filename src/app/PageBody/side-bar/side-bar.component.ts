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

  // Function to set the header name and sidebar active
  selectHeaderName(name:string){
    this.sidebarHeaderService.setHeaderName(name);
    this.sidebarHeaderService.setSidebarActive();
  }

  @Input() sidebarActivee: boolean = false;
}
 