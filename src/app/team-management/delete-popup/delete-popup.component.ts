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

    errorMessage: string = ''; // Define the errorMessage property

    // Method to delete a team
    onDeleteTeam(): void {
      const teamId = this.teamData.id;
    
      this.api.deleteTeams(teamId).subscribe(
        response => {
          console.log('Team deleted', response);
          this.errorMessage = ''; 
        },
        error => {
          console.error('Error deleting team', error);
          this.errorMessage = 'There was an error deleting the team. Please try again later.';
        }
      );
    }


}
