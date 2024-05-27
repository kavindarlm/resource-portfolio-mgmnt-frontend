import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-sprint-popup',
  templateUrl: './delete-sprint-popup.component.html',
  styleUrl: './delete-sprint-popup.component.css'
})
export class DeleteSprintPopupComponent {

  sprintName: string = '';

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
  }


  cancelDelete() {
    this.router.navigate(['/']); 
  }
  

}
