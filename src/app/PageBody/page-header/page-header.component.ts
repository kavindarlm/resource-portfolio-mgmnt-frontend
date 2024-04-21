import { Component } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  greeting!: string;

  ngOnInit() {
    this.setGreeting();
  }
  
  setGreeting() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 15) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }
}
