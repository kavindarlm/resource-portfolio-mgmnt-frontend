import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
// import { ResourceModel } from './first-view.model';

@Component({
  selector: 'app-first-view',
  templateUrl: './first-view.component.html',
  styleUrl: './first-view.component.css'
})
export class FirstViewComponent implements OnInit {

  resourceList: any[]=[];
  formValue !: FormGroup;

  constructor(private http:HttpClient) {}


  ngOnInit(): void {
    this.loadResources();
  }

  loadResources() {
    this.http.get("assets/getResources.json").subscribe((res:any)=>{
      debugger;
      this.resourceList = res.data;
    })
  }

}
