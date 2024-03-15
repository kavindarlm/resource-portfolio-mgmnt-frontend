import { Component } from '@angular/core';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
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
