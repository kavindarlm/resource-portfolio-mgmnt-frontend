import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { taskApiService } from '../services/taskApi.service';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { taskSharedService } from '../services/taskshared.service';
import { TaskApiResponse } from '../dataModels/projectModel';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../../ConfirmDialogBox/confirm-dialog.service';

function dateRangeValidator(control: FormGroup): ValidationErrors | null {
  const startDate = control.get('exStartDate')?.value;
  const endDate = control.get('exEndDate')?.value;

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return { dateRangeError: true };
  }

  return null;
}

// Custom validator function for allocation percentage
function allocationPercentageValidator(
  control: FormControl
): ValidationErrors | null {
  return new Promise((resolve) => {
    const value = control.value;
    if (isNaN(value) || value < 0 || value > 100) {
      resolve({ invalidAllocationPercentage: true });
    } else {
      resolve(null);
    }
  });
}

@Component({
  selector: 'app-create-newtask',
  templateUrl: './create-newtask.component.html',
  styleUrl: './create-newtask.component.css',
})
export class CreateNewtaskComponent implements OnInit {
  // Define the taskForm property
  taskForm!: FormGroup;
  public projectid!: string;
  submited = false;
  errorMessage: string = '';

  constructor(
    private formbulder: FormBuilder,
    private activateDataRout: ActivatedRoute,
    private taskService: taskApiService,
    private taskDetails: ProjectDetailsComponent,
    private shared: taskSharedService,
    private toaster: ToastrService,
    private confirmMessage: ConfirmDialogService
  ) {}
  ngOnInit(): void {
    // Get the project id from the route
    this.activateDataRout.paramMap.subscribe((param: Params) => {
      this.projectid = param['get']('id');
    });

    // Initialize the taskForm property with a new FormGroup
    this.taskForm = this.formbulder.group(
      {
        taskName: ['', Validators.required],
        taskDescription: ['', Validators.required],
        exStartDate: ['', Validators.required],
        exEndDate: ['', Validators.required],
        taskAllocationPercentage: [
          '',
          Validators.required,
          allocationPercentageValidator,
        ],
      },
      { validator: dateRangeValidator }
    );

        //form value to uppercase
        this.taskForm.valueChanges.subscribe(val =>{
          if(val.taskName && val.taskName.length === 1) {
            this.taskForm.patchValue({taskName: val.taskName.toUpperCase()});
          }
          if(val.taskDescription && val.taskDescription.length == 1) {
            this.taskForm.patchValue({taskDescription: val.taskDescription.toUpperCase()});
          }
        })
  }

  // Implement the submitTaskkform method
  submitTaskkform(data: any) {
    console.log(data);
    this.submited = true;
    if (this.taskForm.invalid) {
      alert('Form Invalid');
      return;
    }

    // Convert taskAllocationPercentage to a number
    data.taskAllocationPercentage = parseFloat(data.taskAllocationPercentage);

    this.confirmMessage.open('Are you sure you want to add this task?').subscribe(confirmed => {
      if (confirmed) {
        this.taskService.addTask(data, this.projectid).subscribe(
          (res: TaskApiResponse) => {
            console.log(res);
            if (res.success === false && res.message) {
              // Task addition was unsuccessful, display the error message
              this.errorMessage = res.message;
              alert(res.message);
            } else {
              // Task added successfully, perform necessary actions
              this.shared.refreshTaskList();
              this.shared.refreshProjectDetails();
              this.addsuccesemassege(data.taskName);
              this.taskForm.reset();
              this.errorMessage = ''; // Reset error message if submission succeeds
            }
          },
          (error) => {
            if (error.error && error.error.message) {
              // Display backend validation error message
              this.errorMessage = error.error.message;
              alert(error.error.message);
            } else {
              console.error(error);
              // Display generic error message
              this.errorMessage = 'Failed to add task. Please try again.';
              alert('Failed to add task. Please try again.');
            }
          }
        );
      }
    })
    
  }

  addsuccesemassege(taskName: string) {
    this.toaster.success(
      `${taskName} Added successfully`,
      'Created Task',
      {
        timeOut: 3000,
      }
    );
  }
}
