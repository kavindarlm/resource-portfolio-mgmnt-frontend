import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sprintApiService } from '../services/sprintApi.service';

@Component({
  selector: 'app-sprint-mgt',
  templateUrl: './sprint-mgt.component.html',
  styleUrls: ['./sprint-mgt.component.css']
})
export class SprintMgtComponent implements OnInit {

  // Parameters to hold sprint data
  sprint_id: string = '';
  sprintName: string = '';
  startDate: string = '';
  endDate: string = '';

  // Constructor injection
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sprintApiService: sprintApiService
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameters
    this.route.params.subscribe(params => {
      this.sprint_id = params['id']; // Retrieve sprint ID from route parameter

      // Call the service to fetch sprint data
      this.sprintApiService.findOneById(parseInt(this.sprint_id)).subscribe(
        (sprint: any) => {
          // Assign sprint data to component properties
          this.sprintName = sprint.sprint_name;
          this.startDate = sprint.start_Date; 
          this.endDate = sprint.end_Date;
        },
        (error: any) => {
          // Handle error
          console.error('Error fetching sprint data:', error);
        }
      );
    });
  }
}
