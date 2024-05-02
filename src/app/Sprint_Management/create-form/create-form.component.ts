import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { sprintApiService } from '../services/sprintApi.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-create-form',
    templateUrl: './create-form.component.html',
    styleUrl: './create-form.component.css'
})
export class CreateFormComponent {

    sprintName: string = '';
    startDate: Date = new Date();
    endDate: Date = new Date();

    processedDataIds: Set<string> = new Set();

    constructor(
        private router: Router,
        private sprintApiService: sprintApiService,
        private route: ActivatedRoute,
        private sharedService: SharedService,
        private resourceAllocationService: ResourceAllocationService) { }

    ngOnInit(): void {
        // Subscribe to the data from the shared service
        this.sharedService.data$.subscribe(data => {
            // Handle the received data
            console.log('Received data:', data);
        });
    }
    
    headArray = ['Resource_ID', 'Team', 'Job_Role', 'Org_Unit', 'Availability'];
    resources = [];

    dateErrorMessage: string | null = null;
    statusMessage: string | null = null;

    getSprintFormData(data: any) {
        const today = new Date();
    
        // Reset error message
        this.dateErrorMessage = null;
        this.statusMessage = null;
    
        // Validate start and end dates
        if (new Date(this.startDate) < today || new Date(this.endDate) < today) {
            this.dateErrorMessage = 'Invalid date. Please try again.';
            return;
        }
    
        if (new Date(this.endDate) < new Date(this.startDate)) {
            this.dateErrorMessage = 'End date cannot be earlier than start date. Please try again.';
            return;
        }
    
        // Prepare sprint data
        const sprintData = {
            sprint_name: this.sprintName,
            start_Date: this.startDate,
            end_Date: this.endDate,
        };
    
        // Call the sprintApiService to create a new sprint
        this.sprintApiService.createSprint(sprintData).subscribe(
            (response) => {
                // Handle success
                this.statusMessage = 'Sprint created successfully!';
                // Reset form
                this.sprintName = '';
                this.startDate = new Date();
                this.endDate = new Date();
    
                // After creating the sprint, find the sprint ID using the sprint name
                this.sprintApiService.findOneByName(sprintData.sprint_name).subscribe(
                    (sprint) => {
                        const sprintId = sprint.id; // Get the sprint ID
    
                        // Get the resource allocation data from the shared service
                        this.sharedService.data$.subscribe(resourceAllocations => {
                            // Filter out data that has already been processed
                            const uniqueAllocations = resourceAllocations.filter(allocation => {
                                const uniqueKey = `${allocation.resourceId}-${allocation.taskId}`;
                                if (this.processedDataIds.has(uniqueKey)) {
                                    return false; // Data has already been processed
                                } else {
                                    this.processedDataIds.add(uniqueKey); // Mark data as processed
                                    return true;
                                }
                            });
    
                            // Process unique data
                            uniqueAllocations.forEach(allocation => {
                                // Create the resource allocation data object
                                const resourceAllocation = {
                                    sprint_id: sprintId,
                                    resource_id: allocation.resourceId,
                                    task_id: allocation.taskId,
                                    percentage: allocation.percentage,
                                };
    
                                // Send the resource allocation data to the resource allocation API service
                                this.resourceAllocationService.createResourceAllocation(resourceAllocation).subscribe(
                                    (response) => {
                                        console.log('Resource allocation created successfully:', response);
                                        // Handle success here (e.g., show a success message)
                                    },
                                    (error) => {
                                        console.error('Error creating resource allocation:', error);
                                        // Handle error (e.g., show an error message)
                                    }
                                );
                            });
                        });
                        this.router.navigate(['/pages-body/sprint-management/createform']);
                    },
                    (error) => {
                        console.error('Error fetching sprint ID:', error);
                        // Handle error (e.g., show an error message)
                    }
                );
            },
            (error) => {
                console.error('Error creating sprint:', error);
                this.statusMessage = 'Failed to create sprint. Please try again.';
            }
        );
    }
    



}