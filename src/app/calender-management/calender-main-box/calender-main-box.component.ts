import { Component, Input } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../shared/api-service.service';


@Component({
  selector: 'app-calender-main-box',
  templateUrl: './calender-main-box.component.html',
  styleUrl: './calender-main-box.component.css'
})
export class CalenderMainBoxComponent {

  constructor(private apiService: ApiServiceService) { }

  onAddEvent(event: {selectedDates: NgbDate[], holidayType: string}) {
    this.apiService.addEvent(event.selectedDates, event.holidayType)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
    }


    holidayType: string = '';
    holidays: any[] = [];
    // In calender-main-box.component.ts
  ngOnInit() {
  this.apiService.getEvents(this.holidayType).subscribe((events: Object) => {
    this.holidays = Object.values(events).map(event => new NgbDate(event.year, event.month, event.day));
  });
}
  
    
}
