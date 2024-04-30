import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-availabiility',
  templateUrl: './availabiility.component.html',
  styleUrl: './availabiility.component.css'
})
export class AvailabiilityComponent {

  resourceId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resourceId = params['id'];
    });
  }

  deleteContent() {
    this.router.navigate(['availableResources']);
  }


  Projects: string[] = ['Project 01', 'Project 02', 'Project 03'];
  Tasks: string[] = ['Task 01', 'Task 02', 'Task 03'];

}
