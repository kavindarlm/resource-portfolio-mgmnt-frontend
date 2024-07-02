import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  startDateChanged = false;
  endDateChanged = false;

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
    this.router.navigate(['/pages-body//sprint-management/sprintmgt/', this.sprintId]); 
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.initializeForm();
      this.loadSprintData(this.sprintId);
    });

    this.editSprintForm.get('start_Date')?.statusChanges.subscribe(() => {
      this.startDateChanged = true;
    });

    this.editSprintForm.get('end_Date')?.statusChanges.subscribe(() => {
      this.endDateChanged = true;
    });
  }

  initializeForm() {
    this.editSprintForm = this.fb.group({
      sprint_name: ['', Validators.required],
      start_Date: ['', [Validators.required, this.dateNotBeforeToday]],
      end_Date: ['', [Validators.required, this.endDateNotBeforeStartDate.bind(this)]]
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

  dateNotBeforeToday(control: AbstractControl): ValidationErrors | null {
    const today = new Date().setHours(0, 0, 0, 0); // Reset time to midnight
    const inputDate = new Date(control.value).setHours(0, 0, 0, 0);
    return inputDate >= today ? null : { dateNotBeforeToday: true };
  }

  endDateNotBeforeStartDate(control: AbstractControl): ValidationErrors | null {
    const startDate = new Date(this.editSprintForm?.get('start_Date')?.value).setHours(0, 0, 0, 0);
    const endDate = new Date(control.value).setHours(0, 0, 0, 0);
    return endDate >= startDate ? null : { endDateNotBeforeStartDate: true };
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
