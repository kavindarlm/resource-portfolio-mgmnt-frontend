import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-resource-calender',
  templateUrl: './resource-calender.component.html',
  styleUrl: './resource-calender.component.css'
})
export class ResourceCalenderComponent {

  
  @Input() text:string='';

  dates: Date[] = [];

  holidays: any[] = [];

  showCalenderAdd=false;
  showCalenderEdit=false;

  constructor( private apiService: ApiServiceService) {
    this.showCalenderAdd=false;
    this.showCalenderEdit=false;
  }
  

  accessCalenderAdd(){
  this.showCalenderAdd=!this.showCalenderAdd;
  }

  accessCalenderEdit(){
    this.showCalenderEdit=!this.showCalenderEdit;
  }

  //holiday type public - bank - mercantile
  @Input() holidayType: string = '';

  //get selected dates and holiday type from calender
  @Output() addEvent = new EventEmitter<{selectedDates: NgbDate[], holidayType: string}>();

   //method to get selected dates and holiday type from calender - reemit to parent
   onAddEvent(event: {selectedDates: NgbDate[], holidayType: string}) {
    this.addEvent.emit(event);
  }


  // In global-calender.component.ts
ngOnInit() {
  this.apiService.getEvents(this.holidayType).subscribe((events: any) => {
    this.holidays = events.map((event: { year: number; month: number; day: number; }) => new NgbDate(event.year, event.month, event.day));
  });
}

}
