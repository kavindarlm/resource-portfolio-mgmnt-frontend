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

  public dataid!: number; // define dataid property
  public teamData: dataModel = { id: 0, teamName: '', description: '', resources: [] }; // define teamData property
  public teamId: number = 0; // define teamId property
  resources: any[] = []; // define resources property
  showResourceTable = false; 
  resourceSelected = new EventEmitter<any>(); // define resourceSelected property
  errorMessage: string = ''; // Define the errorMessage property

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public generalservice: GeneralService,
    private resourceService: ResourceService
  ) {
    this.showResourceTable = false; // set the showResourceTable property
    this.teamData = { id: 0, teamName: '', description: '', resources: [] }; // set the teamData property
  }

  // method to toggle the resource table
  toggleResourceTable() {
    this.showResourceTable = !this.showResourceTable;
  }

  ngOnInit(): void {
    // fetch team data by id
    this.activatedroute.paramMap.subscribe((params: Params) => {
      this.dataid = params['get']('id');

      this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
        this.teamData = data;
        this.errorMessage = ''; // Clear the error message when the request is successful

        //get team id for fetch team resource data to reosurce table 
        this.activatedroute.paramMap.subscribe((params: Params) => {
          this.dataid = params['get']('id');
          this.teamId = this.dataid; // set the teamId

          this.api.fetchData(this.dataid).subscribe((data: dataModel) => {
            this.teamData = data;
            this.errorMessage = ''; // Clear the error message when the request is successful
          }, error => {
            console.error(error);
            // Set the error message when there's an error
            this.errorMessage = 'An error occurred while fetching team data. Please try again later.';
          });
        });
      }, error => {
        console.error(error);
        // Set the error message when there's an error
        this.errorMessage = 'An error occurred while fetching team data. Please try again later.';
      });
    });
  }


  // method to update the team data
  edit() {
    try {
      this.api.updateTeam(this.dataid, this.teamData).subscribe(
        (_res: any) => {
          this.generalservice.refreshTeamList(); // Refresh the team list
          this.router.navigate(['/pages-body/teamlistcomponent']); // Navigate to the team list page
          this.errorMessage = ''; // Clear the error message when the request is successful
        },
        (error: any) => {
          console.error('An error occurred while updating team:', error);
          // Set the error message when there's an error
          this.errorMessage = 'An error occurred while updating the team. Please try again later.';
        }
      );
    } catch (error) {
      console.error('An error occurred while updating team:', error);
      // Set the error message when there's an error
      this.errorMessage = 'An error occurred while updating the team. Please try again later.';
    }
  }

  // method to select and deselect resources to the team
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