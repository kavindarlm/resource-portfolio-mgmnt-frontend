import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { taskApiService } from '../services/taskApi.service';
import { ProjectDetailsComponent } from '../project-details/project-details.component';
import { taskSharedService } from '../services/taskshared.service';

function dateRangeValidator(control: FormGroup): ValidationErrors | null {
  const startDate = control.get('exStartDate')?.value;
  const endDate = control.get('exEndDate')?.value;

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return { dateRangeError: true };
  }
  
  return null;
}

// Custom validator function for allocation percentage
function allocationPercentageValidator(control: FormControl): ValidationErrors | null {
  return new Promise(resolve => {
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
  styleUrl: './create-newtask.component.css'
})
export class CreateNewtaskComponent implements OnInit {
  // Define the taskForm property
  taskForm!: FormGroup;
  public projectid!: string;
  submited = false;

  constructor(private formbulder: FormBuilder,private activateDataRout: ActivatedRoute, private taskService: taskApiService,private taskDetails: ProjectDetailsComponent, private shared: taskSharedService){}
  ngOnInit(): void {

    // Get the project id from the route
    this.activateDataRout.paramMap.subscribe((param: Params) => {
      this.projectid = param['get']('id');
    });
    
    // Initialize the taskForm property with a new FormGroup
      this.taskForm = this.formbulder.group({
        taskName: ['',Validators.required],
        exStartDate: ['',Validators.required],
        exEndDate: ['',Validators.required],
        taskAllocationPercentage: ['',Validators.required,allocationPercentageValidator],
      },{ validator: dateRangeValidator });
      }

      // Implement the submitTaskkform method
    submitTaskkform(data: any){ 
      console.log(data);
      this.submited = true;
      if(this.taskForm.invalid){
        alert('Form Invalid');
        return;
      }
      this.taskService.addTask(data,this.projectid).subscribe((res=>{
        console.log(res);
        this.shared.refreshTaskList();
        this.taskForm.reset();
      }))
      this.taskDetails.getTaskList();
    }
  }
