import { Component, Input } from '@angular/core';
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
  public teamData: dataModel = { teamId:0 , team_Name: '', team_description: '', resources: [] };
  @Input() team_Id: number = 0;
  errorMessage: string = ''; // Define the errorMessage property

  constructor(public generalservice: GeneralService,
    private api: ApiService,
    private router: Router
    ){}

   
    // Method to delete a team
    onDeleteTeam(team_Id: number): void {
      this.api.deleteTeams(team_Id).subscribe(
        response => {
          console.log('Team deleted', response);
          this.errorMessage = '';
          this.generalservice.refreshTeamList();
          this.router.navigate(['/pages-body/teamlistcomponent']);
        },
        error => {
          console.error('Error deleting team', error);
          this.errorMessage = 'There was an error deleting the team. Please try again later.';
        }
      );
    }
}
