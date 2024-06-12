import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ServiceService } from '../../team-management/shared/service.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-available-resource-list',
  templateUrl: './available-resource-list.component.html',
  styleUrls: ['./available-resource-list.component.css']
})
export class AvailableResourceListComponent implements OnInit {
  headArray = ['Resource_ID', 'Team', 'Job_Role', 'Org_Unit', 'Availability'];
  resources: any[] = [];
  filteredContents: any[] = [];
  paginatedContents: any[] = [];
  teams: string[] = [];
  OrgUnit: string[] = ['Development', 'Quality Assurance', 'Product Management'];
  teamFilter: string = '';
  orgUnitFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(
    private resourceService: ResourceService,
    private serviceService: ServiceService,
    private ResourceAllocationService : ResourceAllocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch resources and team names from backend
    this.fetchResources();
    this.fetchTeamNames();
  }

  fetchResources(): void {
    this.resourceService.getResourcesForSprint().subscribe(
      (data: any[]) => {
        this.resources = data.map(resource => ({
          Resource_ID: resource.resource_id,
          Team: resource.team_name,
          Job_Role: resource.role_name,
          Org_Unit: resource.org_unit_name,
          Availability: '' // Placeholder for availability
        }));
        this.calculateAvailability();
      },
      error => {
        console.error('Error fetching resources:', error);
      }
    );
  }

  fetchTeamNames(): void {
    this.serviceService.getTeams().subscribe(
      (data: any[]) => {
        this.teams = data.map(team => team.team_Name);
      },
      error => {
        console.error('Error fetching team names:', error);
      }
    );
  }
  calculateAvailability(): void {
    const observables = this.resources.map(resource => 
      this.ResourceAllocationService.getTasksByResourceId(resource.Resource_ID).pipe(
        map(tasks => {
          const filteredTasks = tasks.filter(task => task.resourceAllocation.task.taskProgressPercentage < 100);
          const totalAllocation = filteredTasks.reduce((total, task) => {
            const allocationPercentage = task.resourceAllocation.percentage || 0; // Assuming the field name is 'percentage'
            return total + allocationPercentage;
          }, 0);
          return {
            ...resource,
            Availability: totalAllocation >= 100 ? 'Not Available' : 'Available'
          };
        })
      )
    );
  
    forkJoin(observables).subscribe(
      updatedResources => {
        this.resources = updatedResources;
        this.filteredContents = this.resources; // Initialize filteredContents with all resources
        this.updatePagination(); // Update pagination after fetching resources
        console.log('Resources with availability:', this.resources);
      },
      error => {
        console.error('Error calculating availability:', error);
      }
    );
  }

  filterResources(): void {
    // Filter resources based on the selected filters
    this.filteredContents = this.resources.filter(resource => {
      // Check if the resource matches the selected Team filter
      const matchesTeam = this.teamFilter === '' || resource.Team === this.teamFilter;
      // Check if the resource matches the selected Org.Unit filter
      const matchesOrgUnit = this.orgUnitFilter === '' || resource.Org_Unit === this.orgUnitFilter;
      // Return true if both conditions are met
      return matchesTeam && matchesOrgUnit;
    });
    this.currentPage = 1; // Reset to first page after filtering
    this.updatePagination();
  }

  resetTeamFilter(): void {
    this.teamFilter = '';
    this.filterResources();
  }

  resetOrgUnitFilter(): void {
    this.orgUnitFilter = '';
    this.filterResources();
  }

  navigateToAvailability(resourceId: string): void {
    this.router.navigate(['/pages-body/sprint-management/createform/availableResources/availability', resourceId]);
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredContents.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.paginateContents();
  }

  paginateContents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedContents = this.filteredContents.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateContents();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateContents();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.paginateContents();
  }
}
