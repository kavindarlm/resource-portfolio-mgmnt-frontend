import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../team-management/shared/resource.service';
import { ServiceService } from '../../team-management/shared/service.service';

@Component({
    selector: 'app-available-resource-list',
    templateUrl: './available-resource-list.component.html',
    styleUrls: ['./available-resource-list.component.css']
})
export class AvailableResourceListComponent implements OnInit {
    headArray = ['Resource_ID', 'Team', 'Job_Role', 'Org_Unit', 'Availability'];
    resources: any[] = [];
    filteredContents: any[] = [];
    teams: string[] = [];
    OrgUnit: string[] = ['Development', 'Quality Assurance', 'Product Management'];
    teamFilter: string = '';
    orgUnitFilter: string = '';

    constructor(
        private resourceService: ResourceService,
        private serviceService: ServiceService
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
                    Availability: 'y' // Placeholder for availability
                }));
                console.log('Resources:', this.resources);
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
    }
}
