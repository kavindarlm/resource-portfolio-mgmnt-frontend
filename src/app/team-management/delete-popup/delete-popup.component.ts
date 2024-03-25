import { Component } from '@angular/core';
import { GeneralService } from '../shared/general.service';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';


@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent {
  public dataid!: number;
  http: any;
  
  constructor(public generalservice: GeneralService,
    private api: ApiService,
    private router: Router
    ){

    

  }

  deleteTeam() {
    this.api.deleteTeam(this.dataid).subscribe(
      () => {
        this.router.navigate(['/teams']);
      },
      (error: any) => {
        console.error('Failed to delete team:', error);
      }
    );
  }


}
