import { Component , Input } from '@angular/core';
import { CreateFormComponent } from '../../create-form/create-form.component';
import { SprintMgtComponent } from '../../sprint-mgt/sprint-mgt.component';
import { sprintApiService } from '../../services/sprintApi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  sprints!: any[];


  constructor(private sprintApiService: sprintApiService) {} // Inject the SprintApiService


  ngOnInit(): void {
    this.fetchSprints();
  }

  // Fetch all sprints using SprintApiService

  fetchSprints(): void {
    this.sprintApiService.getAllSprints().subscribe(
      (data: any[]) => {
        this.sprints = data;
      },
      (error) => {
        console.error('Error fetching sprints:', error);
      }
    );
  }

}
