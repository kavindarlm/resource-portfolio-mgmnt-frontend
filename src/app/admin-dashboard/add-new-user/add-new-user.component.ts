import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../admin-dashboard-services/dashboard.service';
import { FunctionManagementComponent } from '../function-management/function-management.component';
import { SharedService } from '../admin-dashboard-services/shared.service';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.css'
})
export class AddNewUserComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: DashboardService, private sharedService: SharedService) { }

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      user_name: ['', Validators.required],
      user_email: ['', Validators.required],
    });
  }

  submitUserForm(Userdata: any) {
    console.log(Userdata);
    console.log(this.sharedService.functionIds$);
    this.userService.createUser(Userdata).subscribe((res) => {
      console.log(res);
    });
  }
}
