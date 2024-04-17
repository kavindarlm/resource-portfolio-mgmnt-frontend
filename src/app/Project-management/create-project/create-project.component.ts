import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { datamodel } from './modelproject';
import { ProjectListComponent } from '../project-list/project-list.component';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {
 projectform!: FormGroup;
 submited = false;
 constructor(private formbulider: FormBuilder,private api:ApiService, private router: Router){}
 ngOnInit(): void {
     this.projectform = this.formbulider.group({
      projectName: ['',Validators.required],
      projectStartDate: ['',Validators.required],
      projectEndDate: ['',Validators.required],
      criticality: ['',Validators.required], 
      projectManager: ['',Validators.required],
      deliveryManager: ['',Validators.required],
      projectDescription: ['',[Validators.required,Validators.minLength(3)]],
     },
    //  {Validators : this.dateValidator}
    )
 }


//  dateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const start = control.get('projectStartDate');
//   const end = control.get('projectEndDate');
//   console.log("validators called"); 
//   return start && end && start.value !== null && end.value !== null && start.value < end.value 
//   ? null :{ dateValid:true };
//     }

 addProject(data: datamodel) {
    // console.log(data);
    this.submited = true;
    if(this.projectform.invalid){ 
      alert('Form Invalid');
      return;  
    }
//     else{
//     alert('Form Submitted Successfully');
//     this.api.addProject(data).subscribe((res=>{
//       this.projectform.reset();
//       this.router.navigate(['pages-body/projectlist']);
//     }))
//   }
// } 
this.api.addProject(data).subscribe((res) => {
  alert('Form Submitted Successfully');
  console.log('Project added successfully:', res);
  this.projectform.reset();
  this.router.navigate(['pages-body/projectlist']);
},
(error) => {
  alert('Error adding project:' + error.message);
  console.log('Error adding project:', error);
});
}
}
