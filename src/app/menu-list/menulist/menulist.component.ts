import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrl: './menulist.component.css'
})
export class MenulistComponent {
  showMenu: boolean = true;

  toggleSubMenu(){
    this.showMenu = !this.showMenu;
  }

  @HostListener('window:resize',['$event'])
  onResize(event:  any){
    if(event.target.innerWidth >=600){
      this.toggleSubMenu();
    }
  }

}
