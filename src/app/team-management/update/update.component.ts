import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { dataModel } from '../team-form/team-form.model';
import { GeneralService } from '../shared/general.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public dataid!: number;
  public teamData: dataModel = { id:'', teamName: '', description: '', selectedResources: [] }; // Adjust the model based on your API response structure
  showResourceTable = false;

  constructor(
    private activatedroute: ActivatedRoute,
     private router: Router, 
     private api: ApiService,
     public generalservice: GeneralService
     ) 
     { 
    this.showResourceTable = false;
    }

  toggleResourceTable() {
    this.showResourceTable = !this.showResourceTable;
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: Params) => {
      this.dataid = params['get']('id'); // Use 'get' instead of '[]' to get the parameter value

      this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
        this.teamData = data;
      });
    });

  }

//edit team data
edit() {
  this.api.updateTeam(this.dataid, this.teamData).subscribe(
    (_res: any) => { 
      this.router.navigate(['/']); 
    },
    (_error: any) => { 
    }
  );
}

  //delete team data
 
}
  
  
  
