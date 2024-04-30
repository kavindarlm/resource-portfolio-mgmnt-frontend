import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sprint-mgt',
  templateUrl: './sprint-mgt.component.html',
  styleUrl: './sprint-mgt.component.css'
})
export class SprintMgtComponent implements OnInit {

  CloseTab() {

  }

  hArray = ['Resource_ID', 'Team', 'Job_Role', 'Org_Unit', 'Availability'];

  resources: any[] = [];
  resourceIds: number[] = [];

  sprintName: string = '';
  startDate: string = '';
  endDate: string = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }



}
