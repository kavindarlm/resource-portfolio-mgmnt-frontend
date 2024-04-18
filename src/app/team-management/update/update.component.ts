import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Resource, dataModel } from '../team-form/team-form.model';
import { GeneralService } from '../shared/general.service';
import { ResourceService } from '../shared/resource.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {

  public dataid!: number;
  public teamData: dataModel = { id: 0, teamName: '', description: '', resources: [] };
  public teamId: number = 0;
  resources: any[] = [];
  showResourceTable = false;
  resourceSelected = new EventEmitter<any>(); // define resourceSelected property


  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public generalservice: GeneralService,
    private resourceService: ResourceService
  ) {
    this.showResourceTable = false;
    this.teamData = { id: 0, teamName: '', description: '', resources: [] };
  }

  toggleResourceTable() {
    this.showResourceTable = !this.showResourceTable;
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: Params) => {
      this.dataid = params['get']('id');

      this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
        this.teamData = data;

        //get team id for fetch team resource data to reosurce table 
        this.activatedroute.paramMap.subscribe((params: Params) => {
          this.dataid = params['get']('id');
          this.teamId = this.dataid; // set the teamId

          this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
            this.teamData = data;
          });
        });


      });
    });
  }


  //method to update the team data
  edit() {
    this.api.updateTeam(this.dataid, this.teamData).subscribe(
      (_res: any) => {
        this.router.navigate(['/']);
      },
      (_error: any) => {
      }
    );
  }

  //method to select and deselect resources to the team
  handleResourceSelection(resource: any): void {
    const index = this.teamData.resources.findIndex(r => r.resourceId === resource.resourceId);
    if (index > -1) {
      // If the resource is already in teamData.resources, remove it
      this.teamData.resources = [
        ...this.teamData.resources.slice(0, index),
        ...this.teamData.resources.slice(index + 1)
      ];
    } else {
      // If the resource is not in teamData.resources, add it
      const newResource: Resource = {
        resourceId: resource.resourceId,
        id: resource.resourceId, // resource.resourceId
        resourceName: '',
        jobRole: { role_id: 0, role_name: resource.roleName },
        orgUnit: { org_unit_id: 0, unit_name: resource.unitName },
        teamId: 0,
      };

      this.teamData.resources.push(newResource);
    }
  }
}