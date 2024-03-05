import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  submmitted = false;

  constructor(private formBulider: FormBuilder) { }

  // ngOnInit(){
  //   //Validations 

  //   this.projectForm = this.formBulider.group({
  //     projectName:['',Validators.required]
  //   })
  // }

  projectObj: any = {
    projectId: 0,
    projectName: '',
    projectStartDate: '', 
    projectEndDate: '',
    projectManager: '',
    deliveryManager: '', 
    projectDescription: '',
  };

  projectForm: FormGroup = new FormGroup({
    projectId: new FormControl('0'),
    projectName: new FormControl(''),
    projectStartDate: new FormControl(''),
    projectEndDate: new FormControl(''),
    projectManager: new FormControl(''),
    deliveryManager: new FormControl(''),
    projectDescription: new FormControl(''),
  });

  onSaveProject() {
    console.warn(this.projectForm.value);
    alert("cm");
  }
}
