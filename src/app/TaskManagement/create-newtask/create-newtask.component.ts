import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { taskApiService } from '../services/taskApi.service';

@Component({
  selector: 'app-create-newtask',
  templateUrl: './create-newtask.component.html',
  styleUrl: './create-newtask.component.css'
})
export class CreateNewtaskComponent implements OnInit {
  taskForm!: FormGroup;
  public projectid!: string;
  constructor(private formbulder: FormBuilder,private activateDataRout: ActivatedRoute, private taskService: taskApiService){}
  ngOnInit(): void {

    this.activateDataRout.paramMap.subscribe((param: Params) => {
      this.projectid = param['get']('id');
    });
    


      this.taskForm = this.formbulder.group({
        taskName: ['',Validators.required],
        exStartDate: ['',Validators.required],
        exEndDate: ['',Validators.required],
        taskAllocationPercentage: ['',Validators.required]
      });

      }
    submitTaskkform(data: any){
      console.log(data);
      this.taskService.addTask(data,this.projectid).subscribe((res=>{
        console.log(res);
      }))
    }


  }
