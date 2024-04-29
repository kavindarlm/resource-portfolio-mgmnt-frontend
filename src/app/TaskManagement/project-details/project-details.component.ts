import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { taskApiService } from '../services/taskApi.service';
import { projectModel, taskModel } from '../dataModels/projectModel';
import { taskSharedService } from '../services/taskshared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit{
  constructor(private activateDataRout: ActivatedRoute,private api: taskApiService, private shared: taskSharedService){}

  // Define the dataid property
  public dataid!: string;

  // Define the projectData and TaskData properties
  projectData: undefined| projectModel;
  TaskData: undefined| taskModel[];

  // Define the subscription and subscriptionTwo properties
  private subscription!: Subscription;
  private subscriptionTwo!: Subscription;

  // Define the currentPage, itemsPerPage, and totalPages properties
  currentPage = 1;
  itemsPerPage = 8;
  searchText = '';
  totalPages!: number;

  ngOnInit(): void {
      // Get the project id from the route
      this.activateDataRout.paramMap.subscribe((param: Params) => {
        this.dataid = param['get']('id');
        console.log(this.dataid);
      });

      this.subscriptionTwo = this.shared.refreshProjectDetails$.subscribe(() => {
        this.getProjectDetails();
        this.getTaskList();
      })

      this.subscription = this.shared.refreshTaskList$.subscribe(() => {
        this.getTaskList();
      })

  }
  // Implement the getProjectDetails method
  getProjectDetails(){
    this.api.fetchProject(this.dataid).subscribe((data: projectModel)=>{
      this.projectData = data;
    })
  }

  // Implement the getTaskList method
  getTaskList(){
    this.api.getTaskList(this.dataid).subscribe(res => {
      this.TaskData = res;
    })
  }

  // Implement the selectTaskbyId method
  selectTaskbyId(taskid: string){
    console.log("This is taskid",taskid);
    this.shared.refreshTaskList();
  }

} 
