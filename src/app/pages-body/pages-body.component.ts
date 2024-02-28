import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-pages-body',
  templateUrl: './pages-body.component.html',
  styleUrl: './pages-body.component.css'
})
export class PagesBodyComponent {



  sidebarVisible: boolean = false;
  isMobileScreen = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.checkScreenSize();
  }

  checkScreenSize() {
    if(typeof window !== 'undefined'){
      this.isMobileScreen = window.innerWidth <= 768;
    }
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  menuItemName: string = '';
  onClickMenuText(menuItemName: string) {
    this.menuItemName = menuItemName;
  }

}
