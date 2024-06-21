import { Component, OnInit, OnDestroy } from '@angular/core';
import { sprintApiService } from '../../services/sprintApi.service';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  sprints: any[] = [];
  filteredSprints: any[] = [];
  
  private sprintCreatedSubscription!: Subscription;
  private sprintDeletedSubscription!: Subscription;
  private sprintUpdatedSubscription!: Subscription;

  constructor(private sprintApiService: sprintApiService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.fetchSprints();

    // Subscribe to the sprint created event
    this.sprintCreatedSubscription = this.sharedService.sprintCreated$.subscribe(() => {
      this.fetchSprints(); // Refresh the sprint list
    });

    // Subscribe to the sprint deleted event
    this.sprintDeletedSubscription = this.sharedService.sprintDeleted$.subscribe(() => {
      this.fetchSprints(); // Refresh the sprint list
    });

    // Subscribe to the sprint updated event
    this.sprintUpdatedSubscription = this.sharedService.sprintUpdated$.subscribe(() => {
      this.fetchSprints(); // Refresh the sprint list
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.sprintCreatedSubscription) {
      this.sprintCreatedSubscription.unsubscribe();
    }
    if (this.sprintDeletedSubscription) {
      this.sprintDeletedSubscription.unsubscribe();
    }
    if (this.sprintUpdatedSubscription) {
      this.sprintUpdatedSubscription.unsubscribe();
    }
  }

  fetchSprints(): void {
    this.sprintApiService.getAllSprints().subscribe(
      (data: any[]) => {
        this.sprints = data;
        this.filteredSprints = data; // Initialize filteredSprints
      },
      (error) => {
        console.error('Error fetching sprints:', error);
      }
    );
  }

  searchSprints(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value;

    if (!searchTerm) {
      this.filteredSprints = this.sprints;
    } else {
      this.filteredSprints = this.sprints.filter(sprint =>
        sprint.sprint_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
