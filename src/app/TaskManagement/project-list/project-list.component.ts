import { Component, OnInit } from '@angular/core';
import { projectModel } from '../dataModels/projectModel';
import { taskApiService } from '../services/taskApi.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit{
  data: undefined|projectModel[];
  constructor(private api:taskApiService){}
  ngOnInit(): void{
    this.getProjectLists();
  }
  getProjectLists(){
    this.api.getProjectList().subscribe(res=>{
      this.data = res;
      console.log(this.data, 'data')
    })
    
  }
}
