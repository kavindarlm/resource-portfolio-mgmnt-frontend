import { Component, OnInit } from '@angular/core';
import { projectModel } from '../dataModels/projectModel';
import { taskApiService } from '../services/taskApi.service';

@Component({
  selector: 'app-task-project-list',
  templateUrl: './task-project-list.component.html',
  styleUrl: './task-project-list.component.css'
})
export class TaskProjectListComponent implements OnInit{
  data: undefined|projectModel[];
  searchText: string = '';
  currentPage = 1;
  itemsPerPage = 8;
  totalPages!: number;
  
  constructor(private api:taskApiService){}
  ngOnInit(): void{
    this.getProjectLists();
  }
  getProjectLists(){
    this.api.getProjectList().subscribe(res=>{
      this.data = res;
      // console.log(this.data, 'data')
    })
     
  }


  onSearchChange(){
    this.api.searchProject(this.searchText).subscribe(res =>{
      this.data = res;
    })
  }
}
