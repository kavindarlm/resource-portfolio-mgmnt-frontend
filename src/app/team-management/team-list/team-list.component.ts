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
   
   }

  ngOnInit(): void {
    this.fetchTeamList();
    
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
