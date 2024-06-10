import { Component, OnInit } from '@angular/core';
import { sprintApiService } from '../../services/sprintApi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  sprints: any[] = [];
  filteredSprints: any[] = [];

  constructor(private sprintApiService: sprintApiService) {}

  ngOnInit(): void {
    this.fetchSprints();
  }

  fetchSprints(): void {
    this.sprintApiService.getAllSprints().subscribe(
      (data: any[]) => {
        this.sprints = data;
        this.filteredSprints = data; // Initialize filteredSprints
      },
      (error) => {
        console.error('Error fetching sprints:', error);
      }
    );
  }

  searchSprints(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchTerm = target.value;

    if (!searchTerm) {
      this.filteredSprints = this.sprints;
    } else {
      this.filteredSprints = this.sprints.filter(sprint =>
        sprint.sprint_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
}
