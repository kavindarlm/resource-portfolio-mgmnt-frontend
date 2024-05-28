import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SidebarheaderServiceService } from '../side-bar-header-service/sidebarheader-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{
  resetform!: FormGroup;
  show = true;
  isVisible = true;
  constructor(private formBuilder: FormBuilder, private visivilityService: SidebarheaderServiceService) {}

  openpopup() {
    this.show = true;
  }
  closepopup() {
    this.isVisible = false;
    this.visivilityService.hideEditPasswardComponent();
  }
  ngOnInit(): void {
      this.resetform = this.formBuilder.group({
        currentPassword: ['',Validators.required],
        newPassword: ['',Validators.required],
        confirmPassword: ['',Validators.required],
      });

      this.visivilityService.EditpasswordVisible$.subscribe(visible =>{
        this.isVisible = visible;
      });
  }

}
