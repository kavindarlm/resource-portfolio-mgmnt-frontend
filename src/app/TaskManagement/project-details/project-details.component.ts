import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { taskApiService } from '../services/taskApi.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent implements OnInit{
  constructor(private activateDataRout: ActivatedRoute,private api: taskApiService){}
  public dataid!: string;

  ngOnInit(): void {
      this.activateDataRout.paramMap.subscribe((param: Params) => {
        this.dataid = param['get']('id');
        console.log(this.dataid);
      })
  }
  getProjectDetails(){

  }

}
