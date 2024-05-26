import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

interface LoginResponse {
  user_id: number;
  status: number;
}

@Component({
  selector: 'app-login-acc',
  templateUrl: './login-acc.component.html',
  styleUrl: './login-acc.component.css'
})
export class LoginAccComponent {
  data: any;

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) { }

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
