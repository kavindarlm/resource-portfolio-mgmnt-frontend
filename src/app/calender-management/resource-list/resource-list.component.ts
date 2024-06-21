import { Component } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceleaveService } from '../shared/resourceleave.service';
import { Resource } from '../calender.model';
import { ResourceService } from '../../team-management/shared/resource.service';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent {
  resources: Resource[] = []; // Define the resources property
  errorMessage: string = ''; // Define the errorMessage property
  searchtext: string = ''; // Define the searchText property
  currentPage = 1;
  itemsPerPage = 10;
  totalPages: number = 0;

  jobRoles: string[] = []; // array to store job roles for filtering
  orgUnits: string[] = []; // array to store org units for filtering
  selectedJobRole!: string; // selected job role in drop down
  selectedOrgUnit!: string; //selected org unit in drop down


  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiServiceService,
    private resourceleave: ResourceleaveService,
    private resourceService: ResourceService) { }

  ngOnInit() {
    this.loadResources();
    this.resourceService.getJobRoles().subscribe(jobRoles => this.jobRoles = jobRoles);// get job roles to fiter resources
    this.resourceService.getOrgUnits().subscribe(orgUnits => this.orgUnits = orgUnits);//get org units to filter resources
  }

  // Method to load resources
  loadResources(jobRole?: string, orgUnit?: string) {
    try {
      this.apiService.getResources().subscribe(
        data => {
          this.resources = data;
          this.totalPages = Math.ceil(this.resources.length / this.itemsPerPage);
          this.errorMessage = ''; // Clear the error message when the request is successful
        },
        error => {
          console.error('An error occurred while loading resources:', error);
          // Set the error message when there's an error
          this.errorMessage = 'An error occurred while loading resources. Please try again later.';
        }
      );
    } catch (error) {
      console.error('An error occurred while loading resources:', error);
      // Set the error message when there's an error
      this.errorMessage = 'An error occurred while loading resources. Please try again later.';
    }
  }

  rowClick(event: any, resource: any) {
    // Remove the background color from all rows
    var rows = document.querySelectorAll(".clickable-row");
    rows.forEach(function (row) {
      row.classList.remove("active-row");
    });

    // Add background color to the clicked row
    event.currentTarget.classList.add("active-row");

    // Use the service to set the clicked resource
    this.resourceleave.setData(resource);

    // Do something when the row is clicked, (get data to the console)
    console.log("Row clicked: ", resource);
    console.log("Clicked Resource:", resource); // Log clicked resource data
    this.resourceleave.setData(resource);

    // Navigate to the resourceleave/:id route relative to the current route
    this.router.navigate(['resourceleave', resource.resourceId], { relativeTo: this.route });
  }

  // Function to get paginated list of resources
  getFilteredPaginatedResourceList(): Resource[] {
    let filteredResources = this.resources.filter(resource =>
      (this.searchtext ? (resource.resourceId.includes(this.searchtext) ||
        resource.roleName.includes(this.searchtext) ||
        resource.unitName.includes(this.searchtext)) : true) &&
      (this.selectedJobRole ? resource.roleName === this.selectedJobRole : true) &&
      (this.selectedOrgUnit ? resource.unitName === this.selectedOrgUnit : true)
    );

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, filteredResources.length);
    this.totalPages = Math.ceil(filteredResources.length / this.itemsPerPage);

    return filteredResources.slice(startIndex, endIndex);
  }

  // Function to set current page
  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Function to generate page numbers
  getPages(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
