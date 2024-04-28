import { Component } from '@angular/core';
import { SprintManagementService } from '../../services/sprint-management.service';

@Component({
  selector: 'app-handle-requests-list',
  templateUrl: './handle-requests-list.component.html',
  styleUrl: './handle-requests-list.component.css'
})
export class HandleRequestsListComponent {

  sprints!: any[];

  constructor(private sprintService: SprintManagementService) {}

  ngOnInit(): void {
    this.fetchSprints();
  }

  fetchSprints(): void {
    this.sprintService.getAllSprints().subscribe(
      (data: any[]) => {
        this.sprints = data;
      },
      (error) => {
        console.error('Error fetching sprints:', error);
      }
    );

  }

}
