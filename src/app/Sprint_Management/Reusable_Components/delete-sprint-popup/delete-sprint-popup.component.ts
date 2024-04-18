import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintManagementService } from '../../../services/sprint-management.service';

@Component({
  selector: 'app-delete-sprint-popup',
  templateUrl: './delete-sprint-popup.component.html',
  styleUrl: './delete-sprint-popup.component.css'
})
export class DeleteSprintPopupComponent {

  sprintName: string = '';

  constructor(private route: ActivatedRoute,private sprintService: SprintManagementService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintName = params['Sname']; // Get sprint name from route parameter
    });
  }

  deleteSprint() {
    if (confirm('Are you sure you want to delete this sprint?')) {
      this.sprintService.deleteSprint(this.sprintName).subscribe(
        () => {
          console.log('Sprint deleted successfully');
          this.router.navigate(['/']); 
        },
        error => {
          console.error('Error deleting sprint:', error);
        }
      );
    }
  }

  cancelDelete() {
    this.router.navigate(['/']); 
  }
  

}
