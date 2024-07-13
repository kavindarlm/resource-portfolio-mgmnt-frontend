import { Component, OnInit, OnDestroy } from '@angular/core';
import { sprintApiService } from '../../services/sprintApi.service';
import { SharedService } from '../../services/shared.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SidebarheaderServiceService } from '../../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  sprints: any[] = [];
  filteredSprints: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15; // Number of items per page

  private sprintCreatedSubscription!: Subscription;
  private sprintDeletedSubscription!: Subscription;
  private sprintUpdatedSubscription!: Subscription;

  constructor(
    private sprintApiService: sprintApiService,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private refreshData: SidebarheaderServiceService
  ) {}

  ngOnInit(): void {
    this.fetchSprints();

    // Subscribe to events
    this.subscribeToEvents();
  }

  ngOnDestroy(): void {
    // Unsubscribe from events
    this.unsubscribeFromEvents();
  }

  fetchSprints(): void {
    this.spinner.show();
    this.sprintApiService.getAllSprints().subscribe(
      (data: any[]) => {
        this.sprints = data;
        this.updateFilteredSprints(); // Initialize filteredSprints with current page data
        this.spinner.hide();
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
      this.updateFilteredSprints();
    } else {
      this.filteredSprints = this.sprints.filter((sprint) =>
        sprint.sprint_name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateFilteredSprints();
  }

  updateFilteredSprints(): void {
    this.filteredSprints = this.sprints.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  getPaginationArray(): number[] {
    const totalPages = Math.ceil(this.sprints.length / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  private subscribeToEvents(): void {
    this.sprintCreatedSubscription =
      this.sharedService.sprintCreated$.subscribe(() => {
        this.fetchSprints();
      });

    this.sprintDeletedSubscription =
      this.sharedService.sprintDeleted$.subscribe(() => {
        this.fetchSprints();
      });

    this.sprintUpdatedSubscription =
      this.sharedService.sprintUpdated$.subscribe(() => {
        this.fetchSprints();
      });

    this.refreshData.refreshSystem$.subscribe(() => {
      this.fetchSprints();
    });
  }

  private unsubscribeFromEvents(): void {
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
}
