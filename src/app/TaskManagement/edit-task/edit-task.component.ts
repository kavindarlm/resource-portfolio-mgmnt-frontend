import { Component, OnInit } from '@angular/core';
import { taskModel } from '../dataModels/projectModel';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { taskApiService } from '../services/taskApi.service';
import { all } from 'axios';
import { ToastrService } from 'ngx-toastr';
import { taskSharedService } from '../services/taskshared.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private taskApiService: taskApiService,
    private router: Router,
    private toaster: ToastrService,
    private tasksharedService: taskSharedService
  ) {}
  Routetaskid!: string;

  taskForm: taskModel = {
    taskid: '',
    taskName: '',
    exStartDate: '',
    exEndDate: '',
    taskDescription: '',
    taskAllocationPercentage: '',
    taskProgressPercentage: '',
  };
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      this.Routetaskid = param['get']('id');
      console.log(this.Routetaskid);
    });
    this.FetchTaskDetails();
  }

  //Fetching the task details
  FetchTaskDetails() {
    this.taskApiService
      .getTaskByid(this.Routetaskid)
      .subscribe((data: taskModel) => {
        this.taskForm = data;
      });
  }

  //Edit task details
  EditTaskDetails() {
    this.taskApiService
      .editTaskDetails(this.Routetaskid, this.taskForm)
      .subscribe((data: taskModel) => {
        // alert('Task Details Updated Successfully');
        this.addsuccesemassege();
        this.tasksharedService.refreshTaskList();
      });
  }

  //Delete Task
  DeleteTask() {
    if(confirm("Are you sure delete this task?"))
    this.taskApiService
      .deleteTask(this.Routetaskid)
      .subscribe((data: taskModel) => {
        alert('Task Deleted Successfully');
        this.router.navigate(['/pages-body/TaskProjectList']);
      });
  }

  addsuccesemassege() {
    this.toaster.success(
      `Task Edited successfully`,
      'Edited Task',
      {
        timeOut: 3000,
      }
    );
  }
}
