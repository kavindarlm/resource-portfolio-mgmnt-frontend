import { Component, OnInit, OnDestroy } from '@angular/core';
import { sprintApiService } from '../../Sprint_Management/services/sprintApi.service';
import { SharedService } from '../../Sprint_Management/services/shared.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { SidebarheaderServiceService } from '../../PageBody/side-bar-header-service/sidebarheader-service.service';

@Component({
    selector: 'app-sprint-list',
    templateUrl: './sprint-list.component.html',
    styleUrls: ['./sprint-list.component.css'],
})
export class SprintListComponent implements OnInit, OnDestroy {
    sprints: any[] = [];
    filteredSprints: any[] = [];
    pagedSprints: any[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 15; // Adjust as per your preference
    totalPages: number = 0;

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

        // Subscribe to the refresh system event
        this.refreshData.refreshSystem$.subscribe(() => {
            this.fetchSprints();
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
        this.spinner.show();
        this.sprintApiService.getAllSprints().subscribe(
            (data: any[]) => {
                this.sprints = data;
                this.filteredSprints = data;
                this.totalPages = Math.ceil(this.filteredSprints.length / this.itemsPerPage);
                this.currentPage = 1;
                this.updatePagedSprints();
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
            this.filteredSprints = this.sprints;
        } else {
            this.filteredSprints = this.sprints.filter((sprint) =>
                sprint.sprint_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        this.totalPages = Math.ceil(this.filteredSprints.length / this.itemsPerPage);
        this.currentPage = 1;
        this.updatePagedSprints();
    }

    onPageChange(pageNumber: number): void {
        if (pageNumber < 1 || pageNumber > this.totalPages) {
            return;
        }
        this.currentPage = pageNumber;
        this.updatePagedSprints();
    }

    updatePagedSprints(): void {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.pagedSprints = this.filteredSprints.slice(startIndex, startIndex + this.itemsPerPage);
    }

    getPaginationArray(): number[] {
        return Array(this.totalPages)
            .fill(0)
            .map((x, i) => i + 1);
    }
}
