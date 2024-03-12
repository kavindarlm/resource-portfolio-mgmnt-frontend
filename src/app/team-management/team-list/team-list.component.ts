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
        this.teams = res; // Assuming your response is an array of teams, replace 'any' with the actual type
      },
      error: (err: any) => {
        alert('Error while fetching team list');
      }
    });
  }

  



  // teams:any = [
  //   {
  //     teamName: 'Team 1',
  //     descrpition: 'This is team 1',
  //     resourceIds: [1,2,3]
  //   },
  //   {
  //     teamName: 'Team 2',
  //     descrpition: 'This is team 2',
  //     resourceIds: [4,5,6]
  //   },
  //   {
  //     teamName: 'Team 3',
  //     descrpition: 'This is team 3',
  //     resourceIds: [7,8,9]
  //   }
  // ]

  


}
