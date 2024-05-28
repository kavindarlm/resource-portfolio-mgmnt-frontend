import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-acc',
  templateUrl: './login-acc.component.html',
  styleUrl: './login-acc.component.css'
})
export class LoginAccComponent {

  constructor(private authService: AuthService) { }

  user = {
    user_email: '',
    password: '',
    user_id: ''
  };

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user.user_email, this.user.password).subscribe({
      next: () => console.log('Login successful'),
      error: () => console.log('Login failed')
    });
  }
}
