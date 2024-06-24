import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import Router
import { sprintApiService } from '../services/sprintApi.service';
import { SharedService } from '../services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogService } from '../../ConfirmDialogBox/confirm-dialog.service';

@Component({
  selector: 'app-edit-sprint-form',
  templateUrl: './edit-sprint-form.component.html',
  styleUrls: ['./edit-sprint-form.component.css']
})
export class EditSprintFormComponent implements OnInit {

  editSprintForm!: FormGroup;
  isVisible = true;
  sprintId: any = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, 
    private sprintApiService: sprintApiService,
    private sharedService: SharedService,
    private toastr: ToastrService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  openpopup() {
    this.isVisible = true;
  }

  closepopup() {
    this.isVisible = false;
    this.router.navigate(['/pages-body//sprint-management/sprintmgt/',this.sprintId]); 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.initializeForm();
      this.loadSprintData(this.sprintId);
    });
  }

  initializeForm() {
    this.editSprintForm = this.fb.group({
      sprint_name: ['', Validators.required],
      start_Date: ['', Validators.required],
      end_Date: ['', Validators.required]
    });
  }

  loadSprintData(sprintId: number) {
    this.sprintApiService.findOneById(sprintId).subscribe(
      data => {
        this.editSprintForm.patchValue({
          sprint_name: data.sprint_name,
          start_Date: data.start_Date,
          end_Date: data.end_Date
        });
      },
      error => {
        console.error('Error fetching sprint data', error);
      }
    );
  }

  onSubmit() {
    if (this.editSprintForm.valid) {
      this.confirmDialogService.open('Are you sure you want to update this sprint?').subscribe(confirmed => {
        if (confirmed) {
          const updateSprintDto = this.editSprintForm.value;
          this.sprintApiService.updateSprint(this.sprintId, updateSprintDto).subscribe(
            response => {
              this.toastr.success('Sprint updated successfully!', 'Success');
              this.closepopup();
              this.sharedService.notifySprintUpdated(); // Notify about the update
            },
            error => {
              this.toastr.error('Error updating sprint. Please try again.', 'Error');
            }
          ); 
        }
      
      }); 
    }
  }
}
