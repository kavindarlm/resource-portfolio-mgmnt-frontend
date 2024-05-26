import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { SharedService } from '../admin-dashboard-services/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersFunctionModel } from '../dashboard-model/usersFunctionModel';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.css'
})
export class AddNewUserComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: DashboardService, private sharedService: SharedService, private toastr: ToastrService) { }

  userForm!: FormGroup;
  errormessage: string = '';
  selectedRole!: string;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      user_role: ['', Validators.required],
    });
    this.userForm.controls['user_role'].valueChanges.subscribe(value => {
      this.selectedRole = value;
    });
  }

  isFormValid(): boolean {
    return this.userForm.valid;
  }

  submitUserForm() {
    if (this.isFormValid()) {
      const Userdata = {
        user_name: this.userForm.get('user_name')?.value,
        user_email: this.userForm.get('user_email')?.value,
        user_role: this.userForm.get('user_role')?.value,
      };
      this.userService.createUser(Userdata).subscribe({
        next: (res) => {
          console.log(res);
          this.userForm.reset();
          this.sharedService.refreshUserList();
          this.showSuccess(Userdata.user_name);
          
          if (res.user_id !== undefined) {
            const userId = res.user_id;
  
            this.sharedService.functionIds$.pipe(take(1)).subscribe(functionIds => {
              const userFunctionModel: UsersFunctionModel = {
                user_id: userId,
                functionIds: functionIds
              };
    
              this.userService.addUserFunction(userFunctionModel).subscribe((res) => {});
            });
            this.router.navigate(['/admin-dashboard']);
          } else {
            console.error('user_id is undefined');
          }
        },
        error: (message) => {
          if (message === 'Email already exists') {
            alert('Email already exists');
          } else {
            console.error(message);
          }
        }
      });
    } else {
      if(confirm('Form is invalid'))
      console.log('Form is invalid');
    }
  }

  showSuccess(username: string) {
    this.toastr.success(`${username} added successfully`, 'User Added', {
      timeOut: 3000,
    });
  }

  capitalizeFirstLetter() {
    const userNameControl = this.userForm.get('user_name');
    if (userNameControl && userNameControl.value && userNameControl.value.length > 1) {
      let words = userNameControl.value.split(' ');
      words = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1));
      userNameControl.setValue(words.join(' '));
    }
  }
}
