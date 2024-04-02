import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { taskModel, taskUpdateModel } from '../dataModels/projectModel';
import { taskApiService } from '../services/taskApi.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit {
  public taskid! : string;
  taskDetails: taskModel={
    taskid: '',
    taskName: '',
    exStartDate: '',
    exEndDate: '',
    taskDescription: '',
    taskAllocationPercentage: '',
    taskProgressPercentage: ''
  }

  taskUpdate: taskUpdateModel={
    taskProgressPercentage: ''
  }
  constructor(private activateDataRout: ActivatedRoute, private TaskService: taskApiService){}
  ngOnInit(): void {
      this.activateDataRout.paramMap.subscribe((param: Params) => {
        this.taskid = param['get']('id');
        console.log(this.taskid);
      });
      this.getTaskDetails();
  }

  sliderValue: number = 1;
  trackGradient: string= ''; // CSS variable to hold the track gradient

  updateProgress(event: any) {
    this.sliderValue = event.target.value;

    const percentage = (this.sliderValue - 1) / (100 - 1) * 100;
    // Dynamically update the gradient based on the percentage
    this.trackGradient = `linear-gradient(to right, #A9BCFF 0%, #A9BCFF ${percentage}%, #7752FE ${percentage}%, #7752FE 100%)`;
  }

  getTaskDetails(){
    this.TaskService.getTaskByid(this.taskid).subscribe((data: taskModel) =>{
      this.taskDetails = data;
    })
  }

  updatedata(){
    this.TaskService.updatetaskPersentage(this.taskid, this.taskDetails).subscribe((data: taskUpdateModel) =>{
      this.taskUpdate = data;
      alert("Task Updated Successfully");
    });
  }
}
