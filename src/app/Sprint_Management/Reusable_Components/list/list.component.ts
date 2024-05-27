import { Component , Input } from '@angular/core';
import { CreateFormComponent } from '../../create-form/create-form.component';
import { SprintMgtComponent } from '../../sprint-mgt/sprint-mgt.component';
import { SprintManagementService } from '../../../services/sprint-management.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

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
