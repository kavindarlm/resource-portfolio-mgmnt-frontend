import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { ResourceService } from '../shared/resource.service';
import { ActivatedRoute } from '@angular/router';

interface Resource {
  resourceId: number;
  roleName: string;
  unitName: string;
  teamId: number;
}

@Component({
  selector: 'app-update-resourc-table',
  templateUrl: './update-resourc-table.component.html',
  styleUrl: './update-resourc-table.component.css'
})
export class UpdateResourcTableComponent {

  selectedResources: any[] = []; // Array to store selected resources -new
  teamResources: Resource[] = []; //Array to store team resources 
  searchtext: any; //search bar
  resources: { resourceId: number; roleName: string; unitName: string; }[] = [];
  @Input() teamId: number | undefined = undefined;
  @Output() resourcesSelected = new EventEmitter<any[]>(); //event emitter to emit the selected resource 


  constructor(private service: ServiceService,
    private resourceService: ResourceService,
    private route: ActivatedRoute

  ) { }


  ngOnInit() {
    // Ensure backend connection here
    //get the team resource data
    this.route.params.subscribe(params => {
      const teamId = +params['teamId'];
      if (this.teamId !== undefined) {
        this.loadResources(this.teamId);
      }
    });

    this.resourceService.getResourcesByTeamId(4).subscribe(resources => {
      this.teamResources = resources;
    });
  }

  // method to get team resource 
  loadResources(teamId: number): void {
    this.resourceService.getResourcesByTeamIdAndNull(teamId).subscribe(resources => {
      this.resources = resources;
    });
  }

  //check the resource already a memeber of a particular team
  isTeamResource(resource: Resource): boolean {
    return this.teamResources.some(teamResource => teamResource.resourceId === resource.resourceId);
  }

  handleResourceSelection(resource: any): void {
    resource.selected = true;
    this.resourcesSelected.emit(resource);

    const index = this.selectedResources.findIndex(selectedResource => selectedResource.resourceId === resource.resourceId);
    if (index > -1) {
      // If the resource is already in selectedResources, remove it
      this.selectedResources = [
        ...this.selectedResources.slice(0, index),
        ...this.selectedResources.slice(index + 1)
      ];
    } else {
      // If the resource is not in selectedResources, add it
      this.selectedResources.push(resource);
    }
    this.resourcesSelected.emit(this.selectedResources);
    console.log('Resource selected in UpdateResourcTableComponent:', resource);
  }

  isSelected(resource: any): boolean {
    // Check if a resource with the same resourceId is in the selectedResources array
    return this.selectedResources.some(selectedResource => selectedResource.resourceId === resource.resourceId);
  }





}
