import { Component , Input } from '@angular/core';
import { SprintManagementService } from '../../../services/sprint-management.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  sprints!: any[];


  constructor(private sprintService: SprintManagementService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.fetchSprints();
  }

  fetchSprints(): void {
    this.spinner.show();
    this.sprintService.getAllSprints().subscribe(
      (data: any[]) => {
        this.sprints = data;
      },
      (error) => {
        console.error('Error fetching sprints:', error);
      }
    );
    this.spinner.hide();
  }

}
