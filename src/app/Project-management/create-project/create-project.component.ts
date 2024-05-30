import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApiService } from '../service/api.service';
import { criticalityModel, datamodel } from './modelproject';
import { ProjectListComponent } from '../project-list/project-list.component';
import { Router } from '@angular/router';
import { error } from 'console';
import { sharedprojectService } from '../service/sharedproject.service';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

function dateRangeValidator(control: FormGroup): ValidationErrors | null {
  const startDate = control.get('projectStartDate')?.value;
  const endDate = control.get('projectEndDate')?.value;

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return { dateRangeError: true };
  }

  return null;
}

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css',
})
export class CreateProjectComponent implements OnInit {
  projectform!: FormGroup;
  submited = false;
  criticalityType: undefined| criticalityModel[];
  constructor(
    private formbulider: FormBuilder,
    private api: ApiService,
    private router: Router,
    private sharedService: sharedprojectService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.projectform = this.formbulider.group({
      projectName: ['', Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required],
      criticality_id: ['', Validators.required],
      projectManager_id: ['', Validators.required],
      deliveryManager_id: ['', Validators.required],
      projectDescription: ['', [Validators.required, Validators.minLength(3)]],
    },
    {validator: dateRangeValidator}
  );

    this.getCriticality();
  }

  //Add Project function
  addProject(data: datamodel) {
    this.submited = true;
    console.log('Project Data:', data);
    if (this.projectform.invalid) {
      alert('Form Invalid');
      return;
    }
    this.api.addProject(data).subscribe(
      (res) => {
        alert('Form Submitted Successfully');
        console.log('Project added successfully:', res);
        this.addsuccesemassege(data.projectName);
        this.projectform.reset();
        this.sharedService.refreshProjectList();
        this.sharedService.refreshProjectCount();
      },
      (error) => {
        alert('Error adding project:' + error.message);
        console.log('Error adding project:', error);
      }
    );
  }

  //This is for success message
  addsuccesemassege(projectName: string) {
    this.toaster.success(
      `${projectName} Added successfully`,
      'Created Project',
      {
        timeOut: 3000,
      }
    );
  }

  // Get criticality
  getCriticality() {
    this.api.getCriticality().subscribe(
      (res) => {
        
        this.criticalityType = res;
        console.log('Criticality:', this.criticalityType);
      },
      (error) => {
        console.error('Failed to fetch criticality:', error);
      }
    );
  }
}
