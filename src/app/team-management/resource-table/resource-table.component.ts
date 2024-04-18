import { Component } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { ResourceService } from '../shared/resource.service';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrl: './resource-table.component.css'
})
export class ResourceTableComponent {

  selectedResources: any[] = []; // Array to store selected resources -new
  resources:any;

  constructor(private service: ServiceService,
              private resourceService: ResourceService
  ) {}

  ngOnInit() {
    this.loadResources(); // Ensure backend connection here
  }


  loadResources() {
    this.resourceService.getResources().subscribe(
      data => {
        this.resources = data;
      },
      error => {
        console.error(error);
      }
    );
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
