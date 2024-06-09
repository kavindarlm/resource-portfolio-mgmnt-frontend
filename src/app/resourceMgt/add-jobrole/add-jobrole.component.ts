import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JobRoleService } from '../../shared/sevices_resourceMgt/jobRole.service';
import { JobRoleModel } from '../add-form/addformmodel';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-add-jobrole',
  templateUrl: './add-jobrole.component.html',
  styleUrl: './add-jobrole.component.css'
})
export class AddJobroleComponent implements OnInit{
  jobRoleForm!: FormGroup;
  show = true;
  isVisible = true;
  resourceService: any;
  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private jobRoleService: JobRoleService) { }

  openpopup() {
    this.show = true;
  }
  closepopup() {
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.jobRoleForm = this.formBuilder.group({
      roleName: ['', Validators.required]
    });

  }

  isFormValid(): boolean {
    return this.jobRoleForm.valid;
  }

  sendData(data: JobRoleModel) {
    console.log(data);
    // debugger;
    if (this.jobRoleForm.invalid) {
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
      // this.router.navigate(['pages-body/first-view']);
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

      cancelForm() {
        this.isVisible = !this.isVisible;
      }
}