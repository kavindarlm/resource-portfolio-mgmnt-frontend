import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../shared/api-service.service';
import { Holiday } from '../calender.model';

@Component({
  selector: 'app-common-calender ',
  templateUrl: './common-calender.component.html',
  styles: `
  /* Common styles for all screen sizes */

ngb-datepicker {
    color: #1e3895e1;
    border-color:#1e3895e1;
  }

  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
    border-radius: 2px;
    border: 1px solid #8691A833;
    margin: 1px;
    cursor: pointer;
  }

  .custom-day.focused {
    background-color: #e6e6e6;
  }

  .custom-day.selected {
    background-color:#1e3895e1;
    color: white;
  }

  .custom-day.faded {
  }



  button.addbtn,
  button.editbtn
   {
    
    color: #1e3895;
    display: block;
    width: 100%;
  
  }

  button.addbtn:hover,
  button.editbtn:hover {
    background-color: #1e3895;
    color: white;
  }


`,


})
export class CommonCalenderComponent {
  hoveredDate: NgbDate | null = null;
  selectedDates: NgbDate[] = [];
  showSelectedDates = false;
  holidays: { date: NgbDate, id: number }[] = [];
  

  @Input() actionType: 'add' | 'edit' = 'add'; 
  //get the selected dates and holiday type
  @Output() addEvent = new EventEmitter<{selectedDates: NgbDate[], holidayType: string}>();
  //define holiday type
  @Input() holidayType: string = '';

  constructor(private calendar: NgbCalendar, private apiService: ApiServiceService) { }


  onDateSelection(date: NgbDate) {
    if (this.actionType === 'edit') {
      const holidayIndex = this.holidays.findIndex((holiday) =>
        holiday.date.equals(date)
      );
  
      if (holidayIndex !== -1) {
        // Date is a holiday, remove it
        const [deselectedHoliday] = this.holidays.splice(holidayIndex, 1);
        this.onHolidayDeselected(deselectedHoliday);
      } else {
        // Date is not a holiday, add it to the list
        // Using a placeholder value for the ID of the new holiday
        this.holidays.push({ date: date, id: 0 });
      }
    } else if (!this.showSelectedDates) {
      const dateIndex = this.selectedDates.findIndex((selectedDate) =>
        selectedDate.equals(date)
      );
  
      if (dateIndex !== -1) {
        // Date already selected, remove it
        this.selectedDates.splice(dateIndex, 1);
      } else {
        // Date not selected, add it to the list
        this.selectedDates.push(date);
      }
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.hoveredDate &&
      this.selectedDates.length === 1 &&
      date.after(this.selectedDates[0]) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.selectedDates.length === 1 && date.after(this.selectedDates[0]);
  }

isSelected(date: NgbDate) {
  return this.selectedDates.some((selectedDate) => selectedDate.equals(date)) || 
         this.holidays.some((holiday) => holiday.date.equals(date));
}

  // get selected dates and holiday type to the console
  onAddButtonClick() {
    this.addEvent.emit({selectedDates: this.selectedDates, holidayType: this.holidayType});
    
  }

  ngOnInit() {
    console.log(this.holidayType);
    this.apiService.getEvents(this.holidayType).subscribe((holidays: Holiday[]) => {
      console.log(holidays);
      this.holidays = holidays.map((holiday: Holiday) => {
        const date = new Date(holiday.date);
        return {
          date: new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
          id: holiday.id
        };
      });
      console.log(this.holidays);
    });
  }

 // Add this property to your component
deselectedHolidays: Holiday[] = [];

onHolidayDeselected(holiday: { date: NgbDate; id: number; }) {
  const deselectedHoliday: Holiday = {
    id: holiday.id,
    date: new Date(holiday.date.year, holiday.date.month - 1, holiday.date.day),
    holy_type: this.holidayType,
    resourceHolidays: [] // Replace with the actual value
  };
  this.deselectedHolidays.push(deselectedHoliday);
}

onEditButtonClick() {
  // Update holidays as before
  this.holidays.forEach((holiday) => {
    const holidayId = holiday.id.toString();
    const holidayData = {
      date: new Date(holiday.date.year, holiday.date.month - 1, holiday.date.day).toISOString(),
      holy_type: this.holidayType
    };
    this.apiService.updateHoliday(holidayId, holidayData).subscribe(response => {
      console.log(response);
    });
  });

  // Delete deselected holidays
  this.deselectedHolidays.forEach((holiday) => {
    this.apiService.deleteHoliday(holiday.id.toString()).subscribe(response => {
      console.log(response);
    });
  });

  // Clear the array of deselected holidays
  this.deselectedHolidays = [];
}
}
