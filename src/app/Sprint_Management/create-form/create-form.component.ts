import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { sprintApiService } from '../services/sprintApi.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {

  sprintName: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor( private router: Router, private sprintApiService: sprintApiService) { }

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

    // Check if the end date is earlier than the start date
    if (new Date(this.endDate) < new Date(this.startDate)) {
        this.dateErrorMessage = 'End date cannot be earlier than start date. Please try again.';
        return;
    }

    // Prepare sprint data
    const sprintData = {
        sprint_name: this.sprintName,
        start_Date: this.startDate,
        end_Date: this.endDate
    };

    // Call the sprintApiService to create a new sprint
    this.sprintApiService.createSprint(sprintData).subscribe(
        (response) => {
            // Handle success (e.g., show a success message)
            this.statusMessage = 'Sprint created successfully!';
            // Reset form
            this.sprintName = '';
            this.startDate = new Date();
            this.endDate = new Date();
        },
        (error) => {
            // Handle error (e.g., show an error message)
            console.error('Error creating sprint:', error);
            this.statusMessage = 'Failed to create sprint. Please try again.';
        }
    );
}

}