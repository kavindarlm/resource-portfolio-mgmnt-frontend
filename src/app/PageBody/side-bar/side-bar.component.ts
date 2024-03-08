import { Component, Input, OnInit} from '@angular/core';
import { SidebarheaderServiceService } from '../side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit{
  constructor(private sidebarService: SidebarheaderServiceService){}
  ngOnInit(): void {
  }
  selectHeaderName(name:string){
    this.sidebarService.setHeaderName(name);
  }
  @Input() sidebarActivee: boolean = false;
}
 