import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { criticalityModel, datamodel, resourceIdNameModel } from './modelproject';
import { Router } from '@angular/router';
import { sharedprojectService } from '../service/sharedproject.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { ConfirmDialogService } from '../../ConfirmDialogBox/confirm-dialog.service';

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
  styleUrls: ['./create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
  projectform!: FormGroup;
  submitted = false;
  criticalityType: criticalityModel[] = [];
  resources: resourceIdNameModel[] = [];
  filteredOptions: { [key: string]: Observable<resourceIdNameModel[]> } = {};
  showOptions: { [key: string]: boolean } = {};

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private sharedService: sharedprojectService,
    private toastr: ToastrService,
    private confirmMessage: ConfirmDialogService // Inject ToastrService
  ) {}

  ngOnInit(): void {
    this.projectform = this.formbuilder.group({
      projectName: ['', Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required],
      criticality_id: ['', Validators.required],
      projectManagerName: ['', Validators.required],
      projectManager_id: [''], // Use resource ID for project manager
      deliveryManagerName: ['', Validators.required],
      deliveryManager_id: [''], // Use resource ID for delivery manager
      projectDescription: ['', [Validators.required, Validators.minLength(3)]],
    }, { validator: dateRangeValidator });

    const fields = ['projectManagerName', 'deliveryManagerName'];
    fields.forEach(field => {
      this.filteredOptions[field] = this.projectform.get(field)!.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', field))
      );
    });

    this.api.getResourceNameAndId().subscribe(
      res => {
        this.resources = res;
      },
      error => {
        console.error('Failed to fetch resources:', error);
      }
    );

    this.getCriticality();

    //form value to uppercase
    this.projectform.valueChanges.subscribe(val =>{
      if(val.projectName && val.projectName.length === 1) {
        this.projectform.patchValue({projectName: val.projectName.toUpperCase()});
      }
      if(val.projectDescription && val.projectDescription.length == 1) {
        this.projectform.patchValue({projectDescription: val.projectDescription.toUpperCase()});
      }
    })
  }

  private _filter(value: string, field: string): resourceIdNameModel[] {
    const filterValue = value.toLowerCase();
    return this.resources.filter(option => option.resourceName.toLowerCase().includes(filterValue));
  }

  toggleOptionsVisibility(field: string): void {
    this.showOptions[field] = !this.showOptions[field];
  }

  onInput(event: Event, field: string): void {
    this.showOptions[field] = true;
    const input = event.target as HTMLInputElement;
    this.projectform.get(field)!.setValue(input.value);
  }

  selectOption(option: resourceIdNameModel, field: string): void {
    if (field === 'projectManagerName') {
      this.projectform.get('projectManagerName')!.setValue(option.resourceName);
      this.projectform.get('projectManager_id')!.setValue(option.resourceId);
    } else if (field === 'deliveryManagerName') {
      this.projectform.get('deliveryManagerName')!.setValue(option.resourceName);
      this.projectform.get('deliveryManager_id')!.setValue(option.resourceId);
    }
    this.showOptions[field] = false;
  }

  addProject(data: datamodel) {
    this.submitted = true;
    if (this.projectform.invalid) {
      this.toastr.error('Please fill out all required fields correctly.', 'Form Validation Error');
      return;
    }

    const formValues = this.projectform.value;

    const projectData: datamodel = {
      ...formValues,
      projectManager_id: formValues.projectManager_id,
      deliveryManager_id: formValues.deliveryManager_id,
    };
    this.confirmMessage.open('Are you sure you want to add this project?').subscribe(confirmed => {
      if (confirmed) {
        this.api.addProject(projectData).subscribe(
          (res) => {
            this.toastr.success(`${data.projectName} added successfully.`, 'Project Created');
            this.projectform.reset();
            this.sharedService.refreshProjectList();
            this.sharedService.refreshProjectCount();
          },
          (error) => {
            this.toastr.error(`Error adding project: ${error.message}`, 'Error');
            console.error('Error adding project:', error);
          }
        );
      }
    });
  }

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
