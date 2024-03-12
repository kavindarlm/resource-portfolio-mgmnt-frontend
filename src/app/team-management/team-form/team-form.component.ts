import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ServiceService } from '../shared/service.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  teamForm!: FormGroup;
  showResourceTable = false;
  selectedResources: any[] = [];
  

  constructor(private formbuilder: FormBuilder,
     private service: ServiceService) { 
    this.showResourceTable = false;
  }
   

  ngOnInit(): void {
    this.teamForm = this.formbuilder.group({
      teamName: ['', Validators.required],
      description: ['', Validators.required],
      selectedResources: this.formbuilder.array([]) // Initialize selectedResources as a FormArray
    });

    this.service.selectedResources$.subscribe((resources) => {
      this.selectedResources = resources;
      this.updateSelectedResourcesFormArray();
    });

  
  }

  toggleResourceTable() {
    this.showResourceTable = !this.showResourceTable;
  }

  onFormSubmit() {
    if (this.teamForm.valid) {
      // Combine form data and selectedResources
      const formData = { ...this.teamForm.value, selectedResources: this.selectedResources };

      this.service.addTeam(formData).subscribe({
        next: (val: any) => {
          alert('Team added successfully');
        },
        error: (err: any) => {
          alert('Error while adding team');
        }
      });
    }
  }

  // Helper function to update the selectedResources FormArray
  updateSelectedResourcesFormArray() {
    const selectedResourcesArray = this.teamForm.get('selectedResources') as FormArray;
    selectedResourcesArray.clear();

    this.selectedResources.forEach(resource => {
      selectedResourcesArray.push(this.formbuilder.group(resource));
    });
  }
}