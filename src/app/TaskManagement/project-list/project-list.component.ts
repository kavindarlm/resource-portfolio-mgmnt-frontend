import { Component } from '@angular/core';
import { projectModel } from '../dataModels/projectModel';
import { taskApiService } from '../services/taskApi.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  data: undefined|projectModel[];
  constructor(private api:taskApiService){}
  ngOninit(): void{
    this.getProjectList();
  }
  getProjectList(){
    this.api.getProjectList().subscribe(res=>{
      this.data = res;
    })
    
  }
}
