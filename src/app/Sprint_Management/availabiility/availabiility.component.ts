import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';

@Component({
  selector: 'app-availabiility',
  templateUrl: './availabiility.component.html',
  styleUrl: './availabiility.component.css'
})
export class AvailabiilityComponent {

  resourceId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];
  Projects: string[] = ['Project 01', 'Project 02', 'Project 03'];
  Tasks: string[] = ['Task 01', 'Task 02', 'Task 03'];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService // Injecting the ResourceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.resourceId = params['id'];
      this.fetchResourceDetails();
    });
  }

  fetchResourceDetails(): void {
    this.resourceService.findOneResource(this.resourceId).subscribe(
      (data: any) => {
        this.resourceDetails = data;
        console.log('Resource details:', this.resourceDetails);
      },
      (error: any) => {
        console.error('Error fetching resource details:', error);
      }
    );
  }


  deleteContent() {
    this.router.navigate(['availableResources']);
  }


}
