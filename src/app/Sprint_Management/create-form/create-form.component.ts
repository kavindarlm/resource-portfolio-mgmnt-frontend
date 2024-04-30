import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.css'
})
export class CreateFormComponent {

  sprintName: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor( private router: Router) { }

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

    const sprintData = {
        Sname: this.sprintName,
        Start_Date: this.startDate,
        End_Date: this.endDate
    };

}

}