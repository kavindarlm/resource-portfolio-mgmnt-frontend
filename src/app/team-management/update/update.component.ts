import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { dataModel } from '../team-form/team-form.model';
import { GeneralService } from '../shared/general.service';
import { ResourceService } from '../shared/resource.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public dataid!: number;
  public teamData: dataModel = { id:0 , teamName: '', description: '', resources: [] };
  showResourceTable = false;
  
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router, 
    private api: ApiService,
    public generalservice: GeneralService,
    private resourceService: ResourceService
  ) { 
    this.showResourceTable = false;
  }

  toggleResourceTable() {
    this.showResourceTable = !this.showResourceTable;
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: Params) => {
      this.dataid = params['get']('id');

      this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
        this.teamData = data;

        
      });
    });
  }

 

  edit() {
    this.api.updateTeam(this.dataid, this.teamData).subscribe(
      (_res: any) => { 
        this.router.navigate(['/']); 
      },
      (_error: any) => { 
      }
    );
  }
}