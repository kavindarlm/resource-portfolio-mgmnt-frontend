import { Component, Input, OnInit } from '@angular/core';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ResourceAllocationService } from '../services/resource-allocation.service';
import { SharedService } from '../services/shared.service';
import { forkJoin, map } from 'rxjs';

interface ProjectTaskData {
  resourceId: string;
  taskId: string;
  percentage: number | null;
}

@Component({
  selector: 'app-added-resource-list',
  templateUrl: './added-resource-list.component.html',
  styleUrls: ['./added-resource-list.component.css']
})
export class AddedResourceListComponent implements OnInit {
  @Input() HeadArray: any[] = [];
  @Input() tablecontents: any[] = [];

  sharedData: ProjectTaskData[] = [];

  constructor(
    private resourceService: ResourceService,
    private resourceAllocationService: ResourceAllocationService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.data$.subscribe(data => {
      this.sharedData = data;
      this.fetchResources();
    });

    this.fetchResources();
  }

  fetchResources(): void {
    this.resourceService.getResourcesForSprint().subscribe(
      (data: any[]) => {
        this.tablecontents = data.filter(resource =>
          this.sharedData.some(shared => shared.resourceId === resource.resource_id)
        ).map(resource => ({
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

  calculateAvailability(): void {
    const availabilityObservables = this.tablecontents.map(resource =>
      this.resourceAllocationService.getTasksByResourceId(resource.Resource_ID).pipe(
        map(tasks => {
          const totalAllocation = tasks.reduce((total, task) => {
            const allocationPercentage = task.resourceAllocation.percentage || 0;
            return total + allocationPercentage;
          }, 0);
          return {
            ...resource,
            Availability: totalAllocation >= 100 ? 'Not Available' : 'Available'
          };
        })
      )
    );

    // Use forkJoin to wait for all observables to complete
    forkJoin(availabilityObservables).subscribe(
      updatedResources => {
        this.tablecontents = updatedResources;
      },
      error => {
        console.error('Error calculating availability:', error);
      }
    );
  }
}
