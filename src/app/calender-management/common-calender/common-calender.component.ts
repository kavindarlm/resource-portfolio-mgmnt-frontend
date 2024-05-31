import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgbCalendar,
  NgbDate,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../shared/api-service.service';
import { Holiday } from '../calender.model';
import { BehaviorSubject } from 'rxjs';

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
  holidays: { date: NgbDate, id: number }[] = [];
  deselectedHolidays: Holiday[] = [];
  // Declare a new BehaviorSubject to hold the holidays array
 // Declare a new BehaviorSubject to hold the holidays array
holidays$ = new BehaviorSubject<{ date: NgbDate, id: number }[]>([]);

  @Input() actionType: 'add' | 'edit' = 'add';
  @Output() addEvent = new EventEmitter<{ selectedDates: NgbDate[], holidayType: string }>();
  @Input() holidayType: string = '';
  @Input() resourceId: string | null = null; // Add this line to accept resource ID
  //new code to post resource holiday
  @Output() resourceAddEvent = new EventEmitter<{ selectedDates: NgbDate[], holidayType: string, resourceId: string }>();


  constructor(private calendar: NgbCalendar, private apiService: ApiServiceService) {}

  ngOnInit() {
    this.loadHolidays();
  }

  // loadHolidays() {
  //   if (this.holidayType === 'resource' && this.resourceId) {
  //     this.apiService.resourceGetEvents(this.resourceId).subscribe((holidays: Holiday[]) => {
  //       this.holidays = holidays.map((holiday: Holiday) => {
  //         const date = new Date(holiday.date);
  //         return {
  //           date: new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
  //           id: holiday.holy_id
  //         };
  //       });
  //     });
  //   } else {
  //     this.apiService.getEvents(this.holidayType).subscribe((holidays: Holiday[]) => {
  //       this.holidays = holidays.map((holiday: Holiday) => {
  //         const date = new Date(holiday.date);
  //         return {
  //           date: new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
  //           id: holiday.holy_id
  //         };
  //       });
  //     });
  //   }
  // }

  loadHolidays() {
    if (this.holidayType === 'resource' && this.resourceId) {
      this.apiService.resourceGetEvents(this.resourceId).subscribe((holidays: Holiday[]) => {
        this.holidays = holidays.map((holiday: Holiday) => {
          const date = new Date(holiday.date);
          return {
            date: new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
            id: holiday.holy_id
          };
        });
        // Update the BehaviorSubject with the new holidays array
        this.holidays$.next(this.holidays);
      });
    } else {
      this.apiService.getEvents(this.holidayType).subscribe((holidays: Holiday[]) => {
        this.holidays = holidays.map((holiday: Holiday) => {
          const date = new Date(holiday.date);
          return {
            date: new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
            id: holiday.holy_id
          };
        });
        // Update the BehaviorSubject with the new holidays array
        this.holidays$.next(this.holidays);
      });
    }
  }

  onDateSelection(date: NgbDate) {
    if (this.actionType === 'edit') {
      const holidayIndex = this.holidays.findIndex((holiday) => holiday.date.equals(date));
      if (holidayIndex !== -1) {
        const [deselectedHoliday] = this.holidays.splice(holidayIndex, 1);
        this.onHolidayDeselected(deselectedHoliday);
      } else {
        this.holidays.push({ date: date, id: 0 });
      }
    } else {
      const dateIndex = this.selectedDates.findIndex((selectedDate) => selectedDate.equals(date));
      if (dateIndex !== -1) {
        this.selectedDates.splice(dateIndex, 1);
      } else {
        this.selectedDates.push(date);
      }
    }
  }

  isHovered(date: NgbDate) {
    return this.hoveredDate && this.selectedDates.length === 1 && date.after(this.selectedDates[0]) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.selectedDates.length === 1 && date.after(this.selectedDates[0]);
  }

 
  

  isSelected(date: NgbDate) {
    const holidays = this.holidays$.getValue();
    console.log('isSelected called with date:', date);
    console.log('holidays array:', this.holidays);
    if (this.holidayType === 'resource') {
      const isResourceHoliday = this.holidays.some(holiday => holiday.date.year === date.year && holiday.date.month === date.month && holiday.date.day === date.day);
      console.log('isResourceHoliday:', isResourceHoliday);
      return isResourceHoliday;
    } else {
      const isSelectedDate = this.selectedDates.some(selectedDate => selectedDate.year === date.year && selectedDate.month === date.month && selectedDate.day === date.day);
      const isHoliday = this.holidays.some(holiday => holiday.date.year === date.year && holiday.date.month === date.month && holiday.date.day === date.day);
      console.log('isSelectedDate:', isSelectedDate);
      console.log('isHoliday:', isHoliday);
      return isSelectedDate || isHoliday;
    }
  }

  onAddButtonClick() {
    //new code to post resource hoilday 
    if (this.holidayType === 'resource' && this.resourceId) {
      this.resourceAddEvent.emit({ selectedDates: this.selectedDates, holidayType: this.holidayType, resourceId: this.resourceId });
    } else {
      this.addEvent.emit({ selectedDates: this.selectedDates, holidayType: this.holidayType });
    }
  }

  onHolidayDeselected(holiday: { date: NgbDate; id: number }) {
    const deselectedHoliday: Holiday = {
      holy_id: holiday.id,
      date: new Date(holiday.date.year, holiday.date.month - 1, holiday.date.day),
      holy_type: this.holidayType,
      resourceHolidays: [] // Replace with the actual value
    };
    this.deselectedHolidays.push(deselectedHoliday);
  }

  onEditButtonClick() {
    this.holidays.forEach((holiday) => {
      const holidayId = holiday.id.toString();
      const holidayData: any = {
        date: new Date(holiday.date.year, holiday.date.month - 1, holiday.date.day).toISOString(),
        holy_type: this.holidayType
      };
      if (this.holidayType === 'resource' && this.resourceId) {
        holidayData.resource_id = this.resourceId;
      }
      this.apiService.updateHoliday(holidayId, holidayData).subscribe(response => {
        console.log(response);
      });
    });

    this.deselectedHolidays.forEach((holiday) => {
      this.apiService.deleteHoliday(holiday.holy_id.toString()).subscribe(response => {
        console.log(response);
      });
    });

    this.deselectedHolidays = [];
  }
}

