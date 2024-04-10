import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { SharedService } from '../admin-dashboard-services/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersFunctionModel } from '../dashboard-model/usersFunctionModel';


@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.css'
})
export class AddNewUserComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: DashboardService, private sharedService: SharedService, private toastr : ToastrService) { }

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
    });
  }

  isFormValid(): boolean {
    return this.userForm.valid;
  }

  submitUserForm(Userdata: any) {
    if (this.isFormValid()) {
      this.userService.createUser(Userdata).subscribe((res) => {
        console.log(res);
        this.userForm.reset();
        // this.sharedService.updateFunctionIds([]);
        this.sharedService.refreshUserList();
        this.showSuccess(Userdata.user_name);
  
        const userId = res.user_id;

        this.sharedService.functionIds$.subscribe(functionIds => {
          console.log('Function IDs:', functionIds, 'User ID:', userId);

          const userFunctionModel: UsersFunctionModel = {
            user_id: userId,
            functionIds: functionIds
          };
          console.log('UserFunctionModel:', userFunctionModel);
          this.userService.addUserFunction(userFunctionModel).subscribe

        });
        this.router.navigate(['/admin-dashboard']);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  showSuccess(username: string) {
    this.toastr.success(`${username} added successfully`, 'User Added',{
      timeOut: 3000,
    });
  }
}
