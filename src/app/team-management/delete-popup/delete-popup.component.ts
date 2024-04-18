import { Component } from '@angular/core';
import { GeneralService } from '../shared/general.service';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { dataModel } from '../team-form/team-form.model';


@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {
  public dataid!: number;
  public teamData: dataModel = { id:0 , teamName: '', description: '', resources: [] };

  constructor(public generalservice: GeneralService,
    private api: ApiService,
    private router: Router
    ){}
    

  onDeleteTeam(): void {
    const teamId = this.teamData.id;
  
    this.api.deleteTeams(teamId).subscribe(
      response => {
        console.log('Team deleted', response);
        //  add code here to handle the response, such as refreshing the list of teams
      },
      error => {
        console.error('Error deleting team', error);
        // add code here to handle errors, such as displaying an error message
      }
    );
  }


}
