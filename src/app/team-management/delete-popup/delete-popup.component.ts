import { Component } from '@angular/core';
import { GeneralService } from '../shared/general.service';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.css'
})
export class DeletePopupComponent {
  public dataid!: number;
  constructor(public generalservice: GeneralService,
    private api: ApiService,
    private router: Router
    ){

    

  }

  delete() {
    this.api.deleteTeams(this.dataid).subscribe(
      (_res: any) => { // Change the type of '_res' to 'any'
        // Assuming 'res' is of type 'dataModel'
        // Your logic here
        this.router.navigate(['/']); // Navigate to the desired route
      },
      (error: any) => { // Define error type as 'any' or specify the error type if known
        // Handle errors if necessary
      }
    );
  
  }


}
