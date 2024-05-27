import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from '../shared/api-service.service';
import { ResourceleaveService } from '../shared/resourceleave.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-resource-calender',
  templateUrl: './resource-calender.component.html',
  styleUrls: ['./resource-calender.component.css']
})
export class ResourceCalenderComponent implements OnInit {
  @Input() text: string = '';
  @Input() resourceId: string | null = null;

  dates: Date[] = [];
  holidays: any[] = [];
  showCalenderAdd = false;
  showCalenderEdit = false;

  constructor(private apiService: ApiServiceService, 
    private resourceleave : ResourceleaveService ) {
    this.showCalenderAdd = false;
    this.showCalenderEdit = false;
  }

  accessCalenderAdd() {
    this.showCalenderAdd = !this.showCalenderAdd;
  }

  accessCalenderEdit() {
    this.showCalenderEdit = !this.showCalenderEdit;
  }

  @Input() holidayType: string = '';

  @Output() resourceAddEvent = new EventEmitter<{ selectedDates: NgbDate[], holidayType: string }>();

  onAddEvent(event: { selectedDates: NgbDate[], holidayType: string, resourceId: string }) {
    console.log('Resource ID:', event.resourceId);
  
    // Convert resourceId to an array
    const resourceIds = [event.resourceId];
  
    this.apiService.resourceAddEvent(event.selectedDates, event.holidayType, resourceIds)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
  }

  ngOnInit() {
    this.resourceleave.clickedResource.subscribe(resource => {
      if (resource) {
        this.resourceId = resource.resourceId;
        this.loadEvents();
      }
    });
  }
  
  loadEvents() {
    console.log('Resource ID:', this.resourceId);
    if (this.resourceId) {
      this.apiService.resourceGetEvents(this.holidayType, this.resourceId)
        .pipe(
          map((response: any) => response as any[]) // Change this to your actual type
        )
        .subscribe(
          (events: any[]) => { // Change this to your actual type
            console.log('Events:', events); // Log the events
            this.holidays = events.map((event: { year: number; month: number; day: number; }) => new NgbDate(event.year, event.month, event.day));
          },
          (error) => {
            console.error('Error:', error);
          }
        );
    }
  }
}