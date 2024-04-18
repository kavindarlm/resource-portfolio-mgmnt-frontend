import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent {
  @Input() HeadArray: string[] = [];
  @Input() GridArray: any[] = [];

  constructor(private router: Router) {}

  navigateToAvailability(resourceId: string) {
    // Navigate to the availability component using Angular's router service
    this.router.navigate(['/pages-body/sprint-management/createform/availableResources/availability', resourceId]);
  }
}
