import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';


@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrl: './team-list.component.css'
})
export class TeamListComponent implements OnInit{
  teams:any=[]=[];

  showForm = false;
  showUpdate =false;

  constructor(private service: ServiceService) {
    this.showForm = false;
    this.showUpdate = false;
   }

  ngOnInit(): void {
    this.fetchTeamList();
    
  }

  toggleMainBox() {
    this.showForm = !this.showForm;
  }

  toggleUpdateBox() {
    this.showUpdate = !this.showUpdate;
  }

  fetchTeamList() {
    this.service.getTeams().subscribe({
      next: (res: any) => {
        this.teams = res; 
      },
      error: (_err: any) => {
      
      }
    });
  }

  


}
