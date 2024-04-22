import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login-acc',
  templateUrl: './login-acc.component.html',
  styleUrl: './login-acc.component.css'
})
export class LoginAccComponent {
  data: any;

  constructor(private router: Router) { }

  user = {
    user_email: '',
    password: ''
  };

  ngOnInit() {
  }

  async login() {
    // console.log(this.user);
    console.log('Login processing!');
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        // Data to be sent to the server
        user_email: this.user.user_email,
        password: this.user.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        this.router.navigate(['./admin-dashboard']);
        console.log('Login successful');
      }
    } catch (error) {
      console.log("Login failed");
    }
  }
}
