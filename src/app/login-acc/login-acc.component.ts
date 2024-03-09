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
    email: '',
    password: ''
  };

  ngOnInit() {
    // Instructions that should be executed when the component is initialized
  }

  async login() {
    // console.log(this.user);
    console.log('Login processing!');
    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        // Data to be sent to the server
        email: this.user.email,
        password: this.user.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        this.router.navigate(['/pages-body']);
        console.log('Login successful');
      }
    } catch (error) {
      console.log("Login failed");
    }
  }
}
