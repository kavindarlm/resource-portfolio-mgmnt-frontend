import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { taskApiService } from '../services/taskApi.service';
import { projectModel, taskModel } from '../dataModels/projectModel';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit{
  constructor(private activateDataRout: ActivatedRoute,private api: taskApiService){}

  public dataid!: string;
  projectData: undefined| projectModel;
  TaskData: undefined| taskModel[];
  currentPage = 1;
  itemsPerPage = 8;
  totalPages!: number;

  ngOnInit(): void {
      this.activateDataRout.paramMap.subscribe((param: Params) => {
        this.dataid = param['get']('id');
        console.log(this.dataid);
      });
      this.getProjectDetails();
      this.getTaskList();
  }

  getProjectDetails(){
    this.api.fetchProject(this.dataid).subscribe((data: projectModel)=>{
      this.projectData = data;
    })
  }

  getTaskList(){
    this.api.getTaskList(this.dataid).subscribe(res => {
      this.TaskData = res;
    })
  }

  selectTaskbyId(taskid: string){
    console.log("This is taskid",taskid);
  }

} 
