import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { ServiceService } from '../shared/service.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  teamForm!: FormGroup; //form group
  showResourceTable = false; //flag to show/hide the resource table
  selectedResources: any[] = []; //selected resources
  errorMessage: string = ''; // Define the errorMessage property

  constructor(private formbuilder: FormBuilder,
    private service: ServiceService) { }

  ngOnInit(): void {
    //initialize the form
    this.teamForm = this.formbuilder.group({
      teamName: ['', Validators.required],
      description: ['', Validators.required],
      selectedResources: this.formbuilder.array([])
    });

    //subscribe to the selected resources
    this.service.selectedResources$.subscribe(
      data => {
        this.selectedResources = data;
        this.errorMessage = ''; // Clear the error message when the request is successful
      },
      error => {
        console.error(error);
        // Set the error message when there's an error
        this.errorMessage = 'An error occurred while loading selected resources. Please try again later.';
      }
    );
  }

  //method to toggle the resource table
  toggleResourceTable() {
    this.showResourceTable = !this.showResourceTable;
  }

  //method to submit the form
  onFormSubmit() {
    if (this.teamForm.valid) {
      const resourceIds = this.selectedResources.map(resource => resource.resourceId);
      const formData = { ...this.teamForm.value, resourceIds };

      this.service.addTeam(formData).pipe(
        catchError((error: any) => {
          console.error('An error occurred while adding team:', error);
          // Set the error message when there's an error
          this.errorMessage = 'An error occurred while adding the team. Please try again later.';
          return of(null);
        })
      ).subscribe({
        next: (_val: any) => {
          // Success handling
          this.errorMessage = ''; // Clear the error message when the request is successful
        }
      });
    }
  }
}