import { Component, OnInit } from '@angular/core';
import { taskModel } from '../dataModels/projectModel';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { taskApiService } from '../services/taskApi.service';
import { ToastrService } from 'ngx-toastr';
import { taskSharedService } from '../services/taskshared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private taskApiService: taskApiService,
    private router: Router,
    private toaster: ToastrService,
    private tasksharedService: taskSharedService,
    private spinner: NgxSpinnerService
  ) {}
  Routetaskid!: string;
  projectId!: string;

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

    this.tasksharedService.projectId$.subscribe(id => {
      this.projectId = id;
      console.log('Project ID:', this.projectId);
    });
  }

  // Fetching the task details
  FetchTaskDetails() {
    this.spinner.show();
    this.taskApiService.getTaskByid(this.Routetaskid).subscribe((data: taskModel) => {
      this.taskForm = data;
      this.spinner.hide();
    });
  }

  // Validate task details
  validateTaskDetails(): boolean {
    const startDate = new Date(this.taskForm.exStartDate);
    const endDate = new Date(this.taskForm.exEndDate);

    if (startDate > endDate) {
      this.toaster.error('End date must be after start date.', 'Validation Error');
      return false;
    }
    if (!this.taskForm.taskName || !this.taskForm.exStartDate || !this.taskForm.exEndDate || !this.taskForm.taskDescription || !this.taskForm.taskAllocationPercentage) {
      this.toaster.error('All fields are required.', 'Validation Error');
      return false;
    }
    return true;
  }

  // Edit task details
  EditTaskDetails() {
    if (!this.validateTaskDetails()) {
      return;
    }
    this.taskApiService.editTaskDetails(this.Routetaskid, this.taskForm).subscribe((data: taskModel) => {
      this.toaster.success('Task Edited successfully', 'Edited Task', {
        timeOut: 3000,
      });
      this.tasksharedService.refreshTaskList();
      this.router.navigate(['/pages-body/TaskProjectList/projectTaskDetails/' + this.projectId+'/updatetask/'+this.Routetaskid]);
    });
  }

  // Delete Task
  DeleteTask() {
    if (confirm("Are you sure you want to delete this task?")) {
      this.taskApiService.deleteTask(this.Routetaskid).subscribe((data: taskModel) => {
        this.toaster.success('Task Deleted Successfully');
        this.tasksharedService.refreshTaskList();
        this.router.navigate(['/pages-body/TaskProjectList/projectTaskDetails/' + this.projectId]);
      });
    }
  }

  close() {
    this.router.navigate(['/pages-body/TaskProjectList/projectTaskDetails/' + this.projectId+'/updatetask/'+this.Routetaskid]);
  }
}
