import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-acc',
  templateUrl: './login-acc.component.html',
  styleUrl: './login-acc.component.css'
})
export class LoginAccComponent {

  constructor(private authService: AuthService, private toastr: ToastrService) { }

  user = {
    user_email: '',
    password: '',
    user_id: ''
  };

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user.user_email, this.user.password).subscribe({
      next: () => {
        console.log('Login successful');
        this.showSuccess();
      },
      error: () => {
        console.log('Login failed');
        this.showError();
        this.user = {
          user_email: '',
          password: '',
          user_id: ''
        };
      }
    });
  }

  showSuccess() {
    this.toastr.success('Login Successful');
  }

  showError() {
    this.toastr.error('Login Failed');
  }
}
