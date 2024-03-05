import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResourceModel } from './add-form.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrl: './add-form.component.css'
})

export class AddFormComponent implements OnInit {
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