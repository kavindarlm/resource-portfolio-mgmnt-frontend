import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-newtask',
  templateUrl: './create-newtask.component.html',
  styleUrl: './create-newtask.component.css'
})
export class CreateNewtaskComponent {
  TaskForm: FormGroup = new FormGroup({
    taskName: new FormControl(''),
  expectedStartDate: new FormControl(''),
  expectedEndDate: new FormControl(''),
  taskpersentage: new FormControl(''),
  });
}
