import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { ApiServiceService } from '../shared/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-today-status',
  templateUrl: './today-status.component.html',
  styleUrls: ['./today-status.component.css']
})
export class TodayStatusComponent implements OnInit, OnDestroy {
  currentDate: string;
  currentTime: Date; 
  weekStart: string | undefined;
  weekEnd: string | undefined;
  private timerSubscription!: Subscription;
  holidayStatus: string = 'Checking holiday status...';
  holidayResourcesCount: number = 0;

  constructor(private apiService: ApiServiceService,
    private router: Router
  ) {
    this.currentDate = this.formatDate(new Date());
    this.currentTime = new Date(); // Initialize with the current time
  }

  showSection: boolean = true;

  navigateToCalenderMainBox() {
    this.showSection = false; 
    this.router.navigate(['pages-body/calendertypecomponent/calendermainbox']);
  }

  navigateToResourceList() {
    this.showSection = false; 
    this.router.navigate(['pages-body/calendertypecomponent/resourcelist']);
  }


  ngOnInit(): void {
    this.calculateWeekRange();
    this.setupTimer();

    this.apiService.isTodayAHoliday().subscribe({
      next: (response) => {
        this.holidayStatus = response.isHoliday ? ' Holiday' : ' Working Day';
      },
      error: (error) => {
        console.error('Error fetching holiday status:', error);
        this.holidayStatus = 'Error fetching holiday status';
      }
    });

    this.apiService.getCountOfResourcesWithHolidayToday().subscribe({
      next: (count) => {
        this.holidayResourcesCount = count;
      },
      error: (error) => {
        console.error('Error fetching resources count:', error);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  setupTimer(): void {
    // Emit every second (1000 milliseconds)
    this.timerSubscription = interval(1000).subscribe(() => {
      this.currentDate = this.formatDate(new Date()); // Update the current formatted date
      this.currentTime = new Date(); // Update the current time
      this.calculateWeekRange(); // Recalculate the week range
    });
  }

  calculateWeekRange(): void {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const startDiff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const endDiff = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;

    const weekStart = new Date(now.setDate(now.getDate() + startDiff));
    const weekEnd = new Date(now.setDate(now.getDate() + endDiff));

    this.weekStart = this.formatDate(weekStart);
    this.weekEnd = this.formatDate(weekEnd);
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];

    return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });
  }
}