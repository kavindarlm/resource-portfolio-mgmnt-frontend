import { Component } from '@angular/core';
import { GeneralService } from '../shared/general.service';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
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
    ){

  }

  deleteTeam() {
    if (!this.dataid) {
      console.error('Team ID is undefined.');
      return;
    }
    
    this.api.deleteTeam(this.dataid).subscribe(
      () => {
        // Redirect to the teams list page after successful deletion
        this.router.navigate(['/teams']);
      },
      (error: any) => {
        console.error('Failed to delete team:', error);
      }
    );
  }


}
