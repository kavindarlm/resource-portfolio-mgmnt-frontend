import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { ResourceService } from '../shared/resource.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Resource } from '../team-form/team-form.model';

@Component({
  selector: 'app-update-resourc-table',
  templateUrl: './update-resourc-table.component.html',
  styleUrls: ['./update-resourc-table.component.css']
})
export class UpdateResourcTableComponent implements OnChanges {
  selectedResources: any[] = [];
  teamResources: Resource[] = [];
  searchtext: string = '';
  errorMessage: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages!: number;
  allResources: Resource[] = []; // Combined array of teamResources and resources
  @Input() teamId: number | undefined = undefined;
  @Output() resourceSelected = new EventEmitter<{ resource: Resource, selected: boolean }>();
  @Input() inputSelectedResources: any[] = [];
  @Input() resources: any[] = []; // Make sure this line is present

  constructor(
    private service: ServiceService,
    private resourceService: ResourceService,
    private route: ActivatedRoute
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputSelectedResources']) {
      this.teamResources = this.inputSelectedResources;
      this.allResources = [...this.teamResources, ...this.resources];
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (!isNaN(id)) {
        this.loadResources(id);
      } else {
        console.error('Invalid id:', params['id']);
        this.errorMessage = 'Invalid id. Please check the URL.';
      }
    });
  }

  loadResources(teamId: number): void {
    forkJoin({
      resourcesByTeamId: this.resourceService.getResourcesByTeamId(teamId),
      resourcesByTeamIdNull: this.resourceService.getResourcesByTeamIdNull()
    }).subscribe(results => {
      this.teamResources = results.resourcesByTeamId.map((resource: { resourceId: string, roleName: string, unitName: string, teamId: number }) => ({
        ...resource,
        resourceId: String(resource.resourceId)
      }));
      this.resources = results.resourcesByTeamIdNull.map((resource: { resourceId: string, roleName: string, unitName: string, teamId: number }) => ({
        ...resource,
        resourceId: String(resource.resourceId)
      }));
      this.allResources = [...this.teamResources, ...this.resources];
      this.errorMessage = '';
      this.updateTotalPages();
    }, error => {
      console.error(error);
      this.errorMessage = 'An error occurred while loading resources. Please try again later.';
    });
  }

  isTeamResource(resource: Resource): boolean {
    return this.teamResources.some(teamResource => teamResource.resourceId === resource.resourceId);
  }

  handleResourceSelection(resource: Resource): void {
    const teamResourceIndex = this.teamResources.findIndex(teamResource => teamResource.resourceId === resource.resourceId);
    const resourceIndex = this.resources.findIndex(res => res.resourceId === resource.resourceId);
  
    if (teamResourceIndex > -1) {
      // Remove from teamResources and add back to resources
      this.teamResources = [
        ...this.teamResources.slice(0, teamResourceIndex),
        ...this.teamResources.slice(teamResourceIndex + 1)
      ];
      this.resources.push(resource);
    } else if (resourceIndex > -1) {
      // Remove from resources and add to teamResources
      this.resources = [
        ...this.resources.slice(0, resourceIndex),
        ...this.resources.slice(resourceIndex + 1)
      ];
      this.teamResources.push(resource);
    }
  
    this.allResources = [...this.teamResources, ...this.resources];
    
    // Emit the resourceSelected event with a Resource object
    console.log('Emitting resourceSelected event', resource, teamResourceIndex === -1);
    this.resourceSelected.emit({ resource, selected: teamResourceIndex === -1 });
    
    this.updateTotalPages();
  }

  isSelected(resource: any): boolean {
    return this.selectedResources.some(selectedResource => selectedResource.resourceId === resource.resourceId);
  }

  getPaginatedFilteredResources(): Resource[] {
    const filteredResources = this.allResources.filter(resource => 
      resource.resourceId.toLowerCase().includes(this.searchtext.toLowerCase()) ||
      resource.roleName.toLowerCase().includes(this.searchtext.toLowerCase()) ||
      resource.unitName.toLowerCase().includes(this.searchtext.toLowerCase())
    );
    return this.paginate(filteredResources);
  }

  paginate(resources: Resource[]): Resource[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return resources.slice(startIndex, endIndex);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  updateTotalPages(): void {
    const totalResources = this.allResources.filter(resource => 
      resource.resourceId.toLowerCase().includes(this.searchtext.toLowerCase()) ||
      resource.roleName.toLowerCase().includes(this.searchtext.toLowerCase()) ||
      resource.unitName.toLowerCase().includes(this.searchtext.toLowerCase())
    ).length;
    this.totalPages = Math.ceil(totalResources / this.itemsPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
