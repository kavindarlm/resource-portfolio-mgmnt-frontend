import { Component, OnInit } from '@angular/core';
import { projectModel } from '../dataModels/projectModel';
import { taskApiService } from '../services/taskApi.service';
import { taskSharedService } from '../services/taskshared.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-project-list',
  templateUrl: './task-project-list.component.html',
  styleUrl: './task-project-list.component.css'
})
export class TaskProjectListComponent implements OnInit{
  // Define the data property
  data: undefined|projectModel[];
  searchText: string = '';
  
  constructor(private api:taskApiService, private shared: taskSharedService, private spinner: NgxSpinnerService){}
  ngOnInit(): void{
    this.getProjectLists();
    
  }
  // Implement the getProjectLists method
  getProjectLists(){
    this.spinner.show();
    this.api.getProjectList().subscribe(res=>{
      this.data = res;
    this.spinner.hide();
    })
  }
  // Implement the onSearchChange method
  onSearchChange(){
    this.api.searchProject(this.searchText).subscribe(res =>{
      this.data = res;
    })
  }

  // Implement the openProject method
  openProject(){
    this.shared.refreshProjectDetails();
  }

}
