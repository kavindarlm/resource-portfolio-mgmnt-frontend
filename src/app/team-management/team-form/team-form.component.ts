import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { ServiceService } from '../shared/service.service';
import { of } from 'rxjs';
import { GeneralService } from '../shared/general.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private service: ServiceService,
    private genaralService: GeneralService,
    private router: Router,
    private toastr: ToastrService) { } // Add ToastrService here) { }

  ngOnInit(): void {
    //initialize the form
    this.teamForm = this.formbuilder.group({
      teamName: ['', Validators.required],
      team_description: ['', Validators.required], // Changed from 'teamdescription' to 'team_description'
      selectedResources: this.formbuilder.array([])
    });

    // Subscribe to changes in the form value to uppercase
    this.teamForm.valueChanges.subscribe(val => {
      if (val.teamName && val.teamName.length === 1) {
        this.teamForm.patchValue({teamName: val.teamName.toUpperCase()});
      }
      if (val.team_description && val.team_description.length === 1) {
        this.teamForm.patchValue({team_description: val.team_description.toUpperCase()});
      }
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
  
      // Store the team name in a variable
      const teamName = this.teamForm.value.teamName;
  
      this.service.addTeam(formData).pipe(
        catchError((error: any) => {
          console.error('An error occurred while adding team:', error);
          this.errorMessage = 'An error occurred while adding the team. Please try again later.';
          return of(null);
        })
      ).subscribe({
        next: (_val: any) => {
          this.errorMessage = '';
          this.genaralService.refreshTeamList();
          this.teamForm.reset();
  
          // Use the stored team name in the toastr message
          this.toastr.success(`${teamName} Added successfully`, 'Created Team', { timeOut: 3000 });
          this.router.navigate(['/pages-body/teamlistcomponent']);
        }
      });
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
