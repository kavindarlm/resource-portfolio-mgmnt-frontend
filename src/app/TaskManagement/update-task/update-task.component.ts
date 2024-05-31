import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { taskModel, taskUpdateModel } from '../dataModels/projectModel';
import { taskApiService } from '../services/taskApi.service';
import { taskSharedService } from '../services/taskshared.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css',
})
export class UpdateTaskComponent implements OnInit {
  // Define the taskid property
  public taskid!: string;
  private subcription!: Subscription;

  // Define the taskDetails and taskUpdate properties
  taskDetails: taskModel = {
    taskid: '',
    taskName: '',
    exStartDate: '',
    exEndDate: '',
    taskDescription: '',
    taskAllocationPercentage: '',
    taskProgressPercentage: '',
  };

  taskUpdate: taskUpdateModel = {
    taskProgressPercentage: '',
  };
  constructor(
    private activateDataRout: ActivatedRoute,
    private TaskService: taskApiService,
    private shared: taskSharedService,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    // Get the task id from the route
    this.activateDataRout.paramMap.subscribe((param: Params) => {
      this.taskid = param['get']('id');
      console.log(this.taskid);
    });

    this.subcription = this.shared.refreshTaskList$.subscribe(() => {
      this.getTaskDetails();
    });
  }

  // Define the sliderValue and trackGradient properties
  sliderValue: number = 1;
  trackGradient: string = '';
  updateProgress(event: any) {
    this.sliderValue = event.target.value;

    const percentage = ((this.sliderValue - 1) / (100 - 1)) * 100;
    // Dynamically update the gradient based on the percentage
    this.trackGradient = `linear-gradient(to right, #A9BCFF 0%, #A9BCFF ${percentage}%, #7752FE ${percentage}%, #7752FE 100%)`;
  }

  // Implement the getTaskDetails method
  getTaskDetails() {
    this.TaskService.getTaskByid(this.taskid).subscribe((data: taskModel) => {
      this.taskDetails = data;
    });
  }

  // Implement the updatedata method
  updatedata() {
    this.TaskService.updatetaskPersentage(
      this.taskid,
      this.taskDetails
    ).subscribe((data: taskUpdateModel) => {
      this.taskUpdate = data;
      // alert('Task Updated Successfully');
      this.addsuccesemassege();
      this.shared.refreshTaskList();
    });
  }

  addsuccesemassege() {
    this.toaster.success(
      `Task Progress updated successfully`,
      'Updated Task',
      {
        timeOut: 3000,
      }
    );
  }
}
