import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../shared/api-service.service';
import { Holiday } from '../calender.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-calender',
  templateUrl: './common-calender.component.html',
  styles: `
  ngb-datepicker {
    color: #1e3895e1;
    border-color: #1e3895e1;
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
    background-color: #1e3895e1;
    color: white;
  }



  .custom-day.bank ,
  .custom-day.mercantile,
  .custom-day.public
  {
    background-color: #99ccff; /* Blue color for bank holidays */
    color: white;
  }



  button.addbtn,
  button.editbtn {
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
  holidays: { date: NgbDate, id: number, type: string }[] = [];
  deselectedHolidays: Holiday[] = [];

  @Input() actionType: 'add' | 'edit' = 'add';
  @Output() addEvent = new EventEmitter<{ selectedDates: NgbDate[], holidayType: string }>();
  @Input() holidayType: string = '';
  @Input() resourceId: string | null = null;
  @Output() resourceAddEvent = new EventEmitter<{ selectedDates: NgbDate[], holidayType: string, resourceId: string }>();

  constructor(
    private calendar: NgbCalendar,
    private apiService: ApiServiceService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadHolidays();
  }

  loadHolidays() {
    if (this.holidayType === 'resource' && this.resourceId) {
      console.log('resourceId', this.resourceId);
      this.apiService.resourceGetEvents(this.resourceId).subscribe({
        next: (holidays: any[]) => {
          this.holidays = holidays.map((holidayData: any) => {
            const date = new Date(holidayData.holiday.date);
            return {
              date: new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
              id: holidayData.holiday.holy_id,
              type: holidayData.holiday.holy_type
            };
          });
          console.log('holidays', this.holidays);
        },
        error: (error) => {
          console.error('Error loading resource holidays:', error);
          this.toastr.error('Failed to load resource holidays', 'Error', { timeOut: 3000 });
        }
      });
    } else {
      this.apiService.getEvents(this.holidayType).subscribe({
        next: (holidays: Holiday[]) => {
          this.holidays = holidays.map((holiday: Holiday) => {
            const date = new Date(holiday.date);
            return {
              date: new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate()),
              id: holiday.holy_id,
              type: holiday.holy_type
            };
          });
        },
        error: (error) => {
          console.error('Error loading global holidays:', error);
          this.toastr.error('Failed to load global holidays', 'Error', { timeOut: 3000 });
        }
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
        this.holidays.push({ date: date, id: 0, type: '' });
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
    return this.selectedDates.some((selectedDate) => selectedDate.equals(date)) ||
      this.holidays.some((holiday) => holiday.date.equals(date));
  }

  getHolidayType(date: NgbDate): string {
    const holiday = this.holidays.find((holiday) => holiday.date.equals(date));
    return holiday ? holiday.type : '';
  }

  onAddButtonClick() {
    if (this.holidayType === 'resource' && this.resourceId) {
      this.resourceAddEvent.emit({ selectedDates: this.selectedDates, holidayType: this.holidayType, resourceId: this.resourceId });
      this.toastr.success('Resource leave added successfully', 'Added Resource leave', { timeOut: 3000 });
      this.router.navigate(['/pages-body/calendertypecomponent/resourcelist']);
    } else {
      this.addEvent.emit({ selectedDates: this.selectedDates, holidayType: this.holidayType });
      this.toastr.success('Holiday added successfully', 'Added Holiday', { timeOut: 3000 });
      this.router.navigate(['/pages-body/calendertypecomponent']);
    }
  }

  onHolidayDeselected(holiday: { date: NgbDate; id: number; type: string }) {
    const deselectedHoliday: Holiday = {
      holy_id: holiday.id,
      date: new Date(holiday.date.year, holiday.date.month - 1, holiday.date.day),
      holy_type: this.holidayType,
      resourceHolidays: []
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
      this.apiService.updateHoliday(holidayId, holidayData).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error('Error updating holiday:', error);
          this.toastr.error('Failed to update holiday', 'Error', { timeOut: 3000 });
        }
      });
    });

    this.deselectedHolidays.forEach((holiday) => {
      if (this.holidayType === 'resource') {
        this.apiService.deleteResourceHoliday(holiday.holy_id.toString()).subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success('Resource holiday deleted successfully', 'Deleted Holiday', { timeOut: 3000 });
            this.router.navigate(['/pages-body/calendertypecomponent']);
          },
          error: (error) => {
            console.error('Error deleting resource holiday:', error);
            this.toastr.error('Failed to delete resource holiday', 'Error', { timeOut: 3000 });
          }
        });
      } else {
        this.apiService.deleteHoliday(holiday.holy_id.toString()).subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success('Holiday deleted successfully', 'Deleted Holiday', { timeOut: 3000 });
            this.router.navigate(['/pages-body/calendertypecomponent']);
          },
          error: (error) => {
            console.error('Error deleting holiday:', error);
            this.toastr.error('Failed to delete holiday', 'Error', { timeOut: 3000 });
          }
        });
      }
    });

    this.deselectedHolidays = [];
  }
}
