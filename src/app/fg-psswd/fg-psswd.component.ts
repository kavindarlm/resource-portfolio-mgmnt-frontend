import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fg-psswd',
  templateUrl: './fg-psswd.component.html',
  styleUrl: './fg-psswd.component.css'
})
export class FgPsswdComponent {

  constructor(private authService: AuthService, private tostr :ToastrService, private router : Router) { }

  user = {
    user_email: '',
  };

  fogotPassword() {
    this.authService.forgotPassword(this.user.user_email).subscribe({
      next: () => {this.showSuccess();
      this.user.user_email = '';
      this.router.navigate(['/login']);
    },
      error: () => {this.showerror();
        this.user.user_email = '';},
      });
  }

  showerror() {

    this.tostr.error('Email not in the Database', 'Error');
  }

  showSuccess() {
    this.tostr.success('New password sent to your email', 'Success');
  }

}
