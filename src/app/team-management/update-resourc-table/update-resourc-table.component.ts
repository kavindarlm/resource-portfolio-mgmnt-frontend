import { Component } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { ResourceService } from '../shared/resource.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-resourc-table',
  templateUrl: './update-resourc-table.component.html',
  styleUrl: './update-resourc-table.component.css'
})
export class UpdateResourcTableComponent {
  selectedResources: any[] = []; // Array to store selected resources -new
  

  constructor(private service: ServiceService,
              private resourceService: ResourceService,
              private route: ActivatedRoute

  ) {}

  resources: { resourceId: number; roleName: string; unitName: string; }[] = [];


  ngOnInit() {
     // Ensure backend connection here
     this.route.params.subscribe(params => {
      const teamId = +params['teamId'];
      this.loadResources(teamId);
    });
  }

  loadResources(teamId: number): void {
    this.resourceService.getResourcesByTeamIdAndNull(4).subscribe(resources => {
      this.resources = resources;
    });
  }


  onSelect(resource: any) {
    this.service.addSelectedResource(resource);
    //change the color of the selected row
    const index = this.selectedResources.indexOf(resource);

    // If not selected, add to the array; otherwise, remove it
    if (index === -1) {
      this.selectedResources.push(resource);
    } else {
      this.selectedResources.splice(index, 1);
    }
  }

  isSelected(resource: any): boolean {
    // Check if the resource is in the selectedResources array
    return this.selectedResources.includes(resource);
  }

  //new code -search bar
  searchtext:any;
  
}
