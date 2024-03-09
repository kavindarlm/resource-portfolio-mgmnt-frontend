import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResourceModel } from './first-view.model';

@Component({
  selector: 'app-first-view',
  templateUrl: './first-view.component.html',
  styleUrl: './first-view.component.css'
})
export class FirstViewComponent implements OnInit {
  resourceModelObj : ResourceModel = new ResourceModel();
  formValue !: FormGroup;
  api: any;
  constructor(private formbuilder: FormBuilder) {}
  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      resourceName : [''],
      resourceID : [''],
      jobRole : [''],
      orgUnit : ['']
    })
  }

  postResourceDetails() {
    this.resourceModelObj.resourceName = this.formValue.value.resourceName;
    this.resourceModelObj.resourceID = this.formValue.value.resourceID;
    this.resourceModelObj.jobRole = this.formValue.value.jobRole;
    this.resourceModelObj.orgUnit = this.formValue.value.orgUnit;

    this.api.postResource(this.resourceModelObj)
    .subscribe((res: any)=>{
      console.log(res);
      alert("Employee added successfully");
    },
    ()=>{
      alert("Something went wrong");
    })
  }
}
