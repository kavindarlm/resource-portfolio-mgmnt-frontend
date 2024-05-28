import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarheaderServiceService } from '../side-bar-header-service/sidebarheader-service.service';
import { resetPasswordModel } from '../pageBody-model/resetPwrd';
import { PasswordService } from '../pageBody-services/password.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  resetform!: FormGroup;
  show = true;
  isVisible = true;
  constructor(private formBuilder: FormBuilder, private visibilityService: SidebarheaderServiceService, private passwordService: PasswordService, private authService: AuthService, private toastr: ToastrService) { }

  openpopup() {
    this.show = true;
  }
  closepopup() {
    this.isVisible = false;
    this.visibilityService.hideEditPasswardComponent();
  }
  ngOnInit(): void {
    this.resetform = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.visibilityService.EditpasswordVisible$.subscribe(visible => {
      this.isVisible = visible;
    });
  }

  isFormValid(): boolean {
    return this.resetform.valid;
  }

  submitResetForm() {
    const userId = this.authService.getUserId();
    if (userId === null) {
      console.log('User ID is null');
      return;
    }

    if (this.isFormValid()) {
      const newPassword = this.resetform.get('newPassword')?.value;
      const confirmPassword = this.resetform.get('confirmPassword')?.value;

      if (newPassword !== confirmPassword) {
        console.log('New password and confirm password do not match');
        this.showMisedMatch();
        this.resetform.reset();
        return;
      }
      const resetPassword = {
        user_id: userId,
        currentPassword: this.resetform.get('currentPassword')?.value,
        newPassword: this.resetform.get('newPassword')?.value,
      };
      this.passwordService.resetPassword(resetPassword).subscribe({
        next: (res) => {
          this.resetform.reset();
          this.showSuccess();
        },
        error: (err) => {
          this.resetform.reset();
          this.showError();
        }
      });
    }
  }

  showSuccess() {
    this.toastr.success(`Password reset successful`, 'Password reset successful', {
      timeOut: 4000,
    });
  }

  showError() {
    this.toastr.error(`Current Password is incorrect`, 'Password reset failed', {
      timeOut: 4000,
    });
  }

  showMisedMatch() {
    this.toastr.error(`New password and confirm password do not match`, 'Password reset failed', {
      timeOut: 4000,
    });
  }

}
