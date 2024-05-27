import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ApiService } from '../shared/api.service';
import {  Resource, dataModel } from '../team-form/team-form.model';
import { GeneralService } from '../shared/general.service';
import { ResourceService } from '../shared/resource.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public dataid!: number;
  public teamData: dataModel = { teamId: 0, team_Name: '', team_description: '', resources: [] };
  public teamId: number = 0;
  public resources: Resource[] = []; // Ensure proper type
  showResourceTable = false; 
  resourceSelected = new EventEmitter<Resource>();
  errorMessage: string = '';
  selectedResources: Resource[] = [];

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public generalservice: GeneralService,
    private resourceService: ResourceService,
    private cdr: ChangeDetectorRef
  ) {
    this.showResourceTable = false;
    this.teamData = { teamId: 0, team_Name: '', team_description: '', resources: [] };
  }

  toggleResourceTable() {
    this.showResourceTable = !this.showResourceTable;
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params: Params) => {
      this.dataid = params['get']('id');

      this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
        this.teamData = data;
        this.errorMessage = ''; 

        this.teamId = this.dataid; 

        this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
          this.teamData = data;
          this.errorMessage = '';
        }, error => {
          console.error(error);
          this.errorMessage = 'An error occurred while fetching team data. Please try again later.';
        });
      }, error => {
        console.error(error);
        this.errorMessage = 'An error occurred while fetching team data. Please try again later.';
      });
    });
  }

  edit() {
    try {
      this.api.updateTeam(this.dataid, this.teamData).subscribe(
        (_res: any) => {
          this.generalservice.refreshTeamList();
          this.router.navigate(['/pages-body/teamlistcomponent']);
          this.errorMessage = '';
        },
        (error: any) => {
          console.error('An error occurred while updating team:', error);
          this.errorMessage = 'An error occurred while updating the team. Please try again later.';
        }
      );
    } catch (error) {
      console.error('An error occurred while updating team:', error);
      this.errorMessage = 'An error occurred while updating the team. Please try again later.';
    }
  }

  handleResourceSelected(event: { resource: Resource; selected: boolean }) {
    console.log('Received resourceSelected event', event);
    if (event.selected) {
      this.teamData.resources.push(event.resource);
    } else {
      this.teamData.resources = this.teamData.resources.filter(
        (resource: Resource) => resource.resourceId !== event.resource.resourceId
      );
    }
    console.log('Updated teamData.resources', this.teamData.resources);
  
    // Trigger change detection
    this.cdr.detectChanges();
  }
}
