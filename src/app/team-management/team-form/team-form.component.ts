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
    this.service.selectedResources$.subscribe(
      data => {
        this.selectedResources = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  toggleResourceTable() {
    this.showResourceTable = !this.showResourceTable;
  }

  onFormSubmit() {
    if (this.teamForm.valid) {
      // Extract resourceIds from selectedResources
      const resourceIds = this.selectedResources.map(resource => resource.resourceId);
  
      // Combine form data and resourceIds
      const formData = { ...this.teamForm.value, resourceIds };
  
      this.service.addTeam(formData).subscribe({
        next: (_val: any) => {
          // alert('Team added successfully');
        },
        error: (_err: any) => {
          // alert('Error while adding team');
        }
      });
    }
  }
  }


