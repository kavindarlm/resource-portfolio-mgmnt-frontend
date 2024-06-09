import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { sprintApiService } from '../services/sprintApi.service';

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
    private sprintApiService: sprintApiService
  ) { }

  openpopup() {
    this.isVisible = true;
  }

  closepopup() {
    this.isVisible = false;
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
      const updateSprintDto = this.editSprintForm.value;
      this.sprintApiService.updateSprint(this.sprintId, updateSprintDto).subscribe(
        response => {
          console.log('Sprint updated successfully', response);
          this.closepopup();
        },
        error => {
          console.error('Error updating sprint', error);
        }
      );
    }
  }
}
