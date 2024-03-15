import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-newtask',
  templateUrl: './create-newtask.component.html',
  styleUrl: './create-newtask.component.css'
})
export class CreateNewtaskComponent implements OnInit {
  taskForm!: FormGroup;
  constructor(private formbulder: FormBuilder){}
  ngOnInit(): void {
      this.taskForm = this.formbulder.group({
        taskName: ['',Validators.required],
        expectedStartDate: ['',Validators.required],
        expectedEndDate: ['',Validators.required],
        taskpersentage: ['',Validators.required]
      });

      }
    submitTaskkform(data: any){
      console.log(data);
    }
  }
