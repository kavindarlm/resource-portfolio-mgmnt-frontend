import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../shared/api-service.service';


@Component({
  selector: 'app-global-calender',
  templateUrl: './global-calender.component.html',
  styleUrl: './global-calender.component.css'
})
export class GlobalCalenderComponent {

  @Input() text: string = '';

  dates: Date[] = [];

  holidays: any[] = [];

  //holiday type public - bank - mercantile
  @Input() holidayType: string = '';

  //get selected dates and holiday type from calender
  @Output() addEvent = new EventEmitter<{ selectedDates: NgbDate[], holidayType: string }>();


  showCalenderAdd = false;
  showCalenderEdit = false;

  constructor(private apiService: ApiServiceService) {
    this.showCalenderAdd = false;
    this.showCalenderEdit = false;
  }


  accessCalenderAdd() {
    this.showCalenderAdd = !this.showCalenderAdd;
  }

  accessCalenderEdit() {
    this.showCalenderEdit = !this.showCalenderEdit;
  }

  //change the image according to the holiday type
  getSvgPath(): string {
    switch (this.holidayType.toLowerCase()) {
      case 'public':
        return 'M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z'; // Replace with your public holiday SVG path
      case 'bank':
        return 'm8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z'; // Replace with your bank holiday SVG path
      case 'mercantile':
        return 'M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2'; // Replace with your mercantile holiday SVG path
      default:
        return '';
    }
  }

  //method to get selected dates and holiday type from calender - reemit to parent
  onAddEvent(event: { selectedDates: NgbDate[], holidayType: string }) {
    this.addEvent.emit(event);
  }

  ngOnInit() {
    this.apiService.getEvents(this.holidayType).subscribe((events: any) => {
      this.holidays = events.map((event: { year: number; month: number; day: number; }) => new NgbDate(event.year, event.month, event.day));
    });
  }


}

