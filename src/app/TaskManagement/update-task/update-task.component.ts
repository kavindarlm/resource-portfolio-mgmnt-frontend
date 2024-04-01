import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit {
  public taskid! : string;
  constructor(private activateDataRout: ActivatedRoute){}
  ngOnInit(): void {
      this.activateDataRout.paramMap.subscribe((param: Params) => {
        this.taskid = param['get']('id');
        console.log(this.taskid);
      });
  }

  TaskDetails:  any = [{
    taskName: 'Task 1',
    taskStartDate: '2021-08-01',
    taskEndDate: '2021-08-31',
    taskPecentage: 50,
  }
  ];

  // sliderValue: number = 1; // Initial value

  // updateProgress(event: Event) {
  //   this.sliderValue = (event.target as HTMLInputElement).valueAsNumber;
  // }
  sliderValue: number = 1;
  trackGradient: string= ''; // CSS variable to hold the track gradient

  updateProgress(event: any) {
    this.sliderValue = event.target.value;

    const percentage = (this.sliderValue - 1) / (100 - 1) * 100;
    // Dynamically update the gradient based on the percentage
    this.trackGradient = `linear-gradient(to right, #A9BCFF 0%, #A9BCFF ${percentage}%, #7752FE ${percentage}%, #7752FE 100%)`;
  }
}
