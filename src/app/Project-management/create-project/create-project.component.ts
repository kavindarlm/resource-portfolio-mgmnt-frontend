import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { datamodel } from './modelproject';
import { ProjectListComponent } from '../project-list/project-list.component';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {
 projectform!: FormGroup;
 constructor(private formbulider: FormBuilder,private api:ApiService, private projectList: ProjectListComponent){}
 ngOnInit(): void {
     this.projectform = this.formbulider.group({
      projectName: ['',Validators.required],
      projectStartDate: ['',Validators.required],
      projectEndDate: ['',Validators.required],
      criticality: ['',Validators.required], 
      projectManager: ['',Validators.required],
      deliveryManager: ['',Validators.required],
      projectDescription: ['',Validators.required],
     })
 }

 addProject(data: datamodel) {
    // console.log(data);
    this.api.addProject(data).subscribe((res=>{
      this.projectform.reset();
    }))
    this.projectList.getProjectList();
  }
}
