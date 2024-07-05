import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JobRoleService } from '../../shared/sevices_resourceMgt/jobRole.service';
import { JobRoleModel } from '../add-form/addformmodel';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-jobrole',
  templateUrl: './add-jobrole.component.html',
  styleUrl: './add-jobrole.component.css'
})
export class AddJobroleComponent implements OnInit {
  jobRoleForm!: FormGroup;
  show = true;
  isVisible = true;
  resourceService: any;
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private jobRoleService: JobRoleService,
    private router: Router) { }


  ngOnInit(): void {
    this.jobRoleForm = this.formBuilder.group({
      roleName: ['', Validators.required]
    });

  }

  isFormValid(): boolean {
    return this.jobRoleForm.valid;
  }

  //To add a job role
  sendData(data: JobRoleModel) {
    console.log(data);
    // debugger;
    if (this.jobRoleForm.invalid) {
      this.toastr.error("Please enter the required field to add a new job role.");
      return;
    }
    const dataToSend = this.jobRoleForm.value;
    this.jobRoleService.createJobRole(data)
      .pipe(
        catchError((error) => {
          console.error('Error creating resource:', error);
          return throwError('Error creating resource');
        })
      )
      .subscribe((res => {
        console.log(data);
        this.jobRoleForm.reset();
        this.addsuccesemassege(data.roleName);
        this.jobRoleService.jobRoleListUpdated.emit(); // Emit the event
        this.isVisible = false;
        this.router.navigate(['pages-body/first-view/add-form']);
      }))
  }

  //This is for success message
  addsuccesemassege(roleName: string) {
    this.toastr.success(
      `${roleName} Added successfully`,
      'Created Resource',
      {
        timeOut: 3000,
      }
    );
  }

  //To capitalize the first letter of the input
  capitalizeFirstLetter() {
    const jobRoleNameControl = this.jobRoleForm.get('roleName');
    if (jobRoleNameControl && jobRoleNameControl.value && jobRoleNameControl.value.length > 1) {
      let words = jobRoleNameControl.value.split(' ');
      words = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1));
      jobRoleNameControl.setValue(words.join(' '));
    }
  }

  @Output() cancel = new EventEmitter<void>();

  cancelForm() {
    this.isVisible = !this.isVisible;
    this.cancel.emit();
  }
}
