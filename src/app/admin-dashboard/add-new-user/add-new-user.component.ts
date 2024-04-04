import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { SharedService } from '../admin-dashboard-services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.css'
})
export class AddNewUserComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: DashboardService, private sharedService: SharedService) { }

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
      console.log(Userdata);
      console.log(this.sharedService.functionIds$);
      this.userService.createUser(Userdata).subscribe((res) => {
        console.log(res);
        this.userForm.reset();
        this.sharedService.updateFunctionIds([]);
      });
      this.router.navigate(['admin-dashboard']); // Redirect to the admin dashboard
    }
    else {
      console.log('Form is invalid');
    }
  }
}
