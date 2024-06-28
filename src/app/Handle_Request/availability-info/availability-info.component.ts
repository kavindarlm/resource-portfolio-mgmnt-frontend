import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ResourceService } from '../../team-management/shared/resource.service';
import { taskApiService } from '../../TaskManagement/services/taskApi.service';
import { ApiService } from '../../Project-management/service/api.service';
import { SharedService } from '../../Sprint_Management/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { ResourceAllocationService } from '../../Sprint_Management/services/resource-allocation.service';
import { forkJoin, map, switchMap } from 'rxjs';
import { ApiServiceService } from '../../calender-management/shared/api-service.service';

interface ProjectTaskData {
  resourceId: string;
  taskId: string;
  percentage: number | null;
}

@Component({
  selector: 'app-availability-info',
  templateUrl: './availability-info.component.html',
  styleUrls: ['./availability-info.component.css']
})
export class AvailabilityInfoComponent implements OnInit {

  sprintId: string = '';
  resourceId: string = '';
  resourceDetails: any = {};
  tasks: any[] = [];
  Projects: any[] = [];
  sets: any[] = [{ projectId: '', taskId: '', percentage: null, Tasks: [] }];
  taskProjectDetails: { taskName: string, projectName: string, percentage: number }[] = [];
  holidays: NgbDateStruct[] = [];
  availabilityPercentage: number = 0;
  searchText: string[] = [];
  filteredProjects: any[][] = [];
  dropdownOpen: boolean[] = [];
  selectedProjectNames: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resourceService: ResourceService,
    private toastr: ToastrService,
    private taskApiService: taskApiService,
    private projectApiService: ApiService,
    private ResourceAllocationService: ResourceAllocationService,
    private sharedService: SharedService,
    private ApiServiceService: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sprintId = params['sprintId'];
      this.resourceId = params['resourceId'];
      this.fetchResourceDetails();
      this.fetchProjects();
      this.fetchTasksAndProjectsByResourceId(this.resourceId);
      this.fetchHolidays(this.resourceId);
    });

    this.route.queryParams.subscribe(queryParams => {
      this.availabilityPercentage = queryParams['availability'];
    });

    this.sets.forEach((_, index) => {
      this.searchText[index] = '';
      this.filteredProjects[index] = [];
      this.dropdownOpen[index] = false;
      this.selectedProjectNames[index] = '';
    });
  }

  fetchResourceDetails(): void {
    this.resourceService.findOneResource(this.resourceId).subscribe(
      (data: any) => {
        this.resourceDetails = data;
      },
      (error: any) => {
        console.error('Error fetching resource details:', error);
      }
    );
  }

  fetchTasksAndProjectsByResourceId(resourceId: string): void {
    this.taskProjectDetails = [];
    this.tasks = [];
    this.Projects = [];

    this.ResourceAllocationService.getTasksByResourceId(resourceId).pipe(
      switchMap(tasks => {
        const projectDetailsObservables = tasks.map(task =>
          this.taskApiService.getProjectInfoByTaskId(task.resourceAllocation.task.taskid).pipe(
            map(project => ({
              taskName: task.resourceAllocation.task.taskName,
              projectName: project?.projectName || 'Unknown',
              percentage: task.resourceAllocation.percentage
            }))
          )
        );
        return forkJoin(projectDetailsObservables);
      })
    ).subscribe(
      taskProjectDetails => {
        const seenCombinations = new Set();
        this.taskProjectDetails = taskProjectDetails.filter(detail => {
          const combination = `${detail.taskName}-${detail.projectName}-${detail.percentage}`;
          if (seenCombinations.has(combination)) {
            return false;
          } else {
            seenCombinations.add(combination);
            return true;
          }
        });
        console.log('Unique task and project details:', this.taskProjectDetails);
      },
      error => {
        console.error('Error fetching task and project details:', error);
      }
    );
  }

  fetchProjects(): void {
    this.projectApiService.getProjectList().subscribe(
      (projects: any[]) => {
        this.Projects = projects;
        this.sets.forEach((_, index) => {
          this.filteredProjects[index] = [...this.Projects];
        });
      },
      (error: any) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  fetchHolidays(resourceId: string): void {
    this.ApiServiceService.resourceGetEvents(resourceId).subscribe(
      (holidays: any[]) => {
        this.holidays = holidays.map(holiday => {
          const date = new Date(holiday.holiday.date);
          return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          };
        });
      },
      (error: any) => {
        console.error('Error fetching holidays:', error);
      }
    );
  }

  onProjectSelect(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    const projectId = selectElement.value;
    this.sets[index].projectId = projectId;
    this.fetchTasksByProjectId(projectId, index);
  }

  fetchTasksByProjectId(projectId: string, index: number): void {
    this.taskApiService.getTaskList(projectId).subscribe(
      (tasks: any[]) => {
        this.sets[index].Tasks = tasks;
        console.log(`Fetched tasks for project ID ${projectId}:`, tasks);
      },
      (error: any) => {
        console.error(`Error fetching tasks for project ID ${projectId}:`, error);
      }
    );
  }

  filterProjects(index: number): void {
    this.filteredProjects[index] = this.Projects.filter(project =>
      project.projectName.toLowerCase().includes(this.searchText[index].toLowerCase())
    );
  }

  toggleDropdown(index: number): void {
    this.dropdownOpen[index] = !this.dropdownOpen[index];
  }

  selectProject(index: number, project: any): void {
    this.sets[index].projectId = project.projectid;
    this.selectedProjectNames[index] = project.projectName;
    this.dropdownOpen[index] = false;
    this.fetchTasksByProjectId(project.projectid, index);
  }

  onTaskSelect(event: Event, index: number): void {
    const selectElement = event.target as HTMLSelectElement;
    this.sets[index].taskId = selectElement.value;
  }

  addSet(): void {
    this.sets.push({ projectId: '', taskId: '', percentage: null, Tasks: [] });
    const newIndex = this.sets.length - 1;
    this.searchText[newIndex] = '';
    this.filteredProjects[newIndex] = [...this.Projects];
    this.dropdownOpen[newIndex] = false;
    this.selectedProjectNames[newIndex] = '';
  }

  removeSet(index: number): void {
    if (this.sets.length === 1) {
      this.toastr.error('At least one set should be there.', 'Error');
      return;
    }
    this.sets.splice(index, 1);
    this.searchText.splice(index, 1);
    this.filteredProjects.splice(index, 1);
    this.dropdownOpen.splice(index, 1);
    this.selectedProjectNames.splice(index, 1);
  }

  onAddClick(): void {
    // Check if any set is incomplete
    const invalidSet = this.sets.find(set => !set.projectId || !set.taskId || set.percentage === null);

    if (invalidSet) {
      this.toastr.error('Please fill all fields (Project, Task, and Percentage) for each entry.', 'Error');
      return;
    }

    // Proceed with adding data and creating resource allocations
    this.sets.forEach(set => {
      const projectTaskData: ProjectTaskData = {
        resourceId: this.resourceId,
        taskId: set.taskId,
        percentage: set.percentage
      };
      this.sharedService.addData(projectTaskData);

      // Create resource allocation separately for each set
      this.ResourceAllocationService.createResourceAllocation({
        sprint_id: this.sprintId,
        resource_id: this.resourceId,
        task_id: set.taskId,
        percentage: set.percentage
      }).subscribe(
        () => {
          this.toastr.success('Resource added successfully!', 'Success');
          this.sharedService.notifySprintUpdated(); // Notify sprint update
        },
        error => {
          this.toastr.error('Error creating resource allocation.', 'Error');
          // Handle error as needed
        }
      );
    });

    // Reset sets and related arrays after adding
    this.sets = [{ projectId: '', taskId: '', percentage: null, Tasks: [] }];
    this.searchText = [''];
    this.filteredProjects = [this.Projects];
    this.dropdownOpen = [false];
    this.selectedProjectNames = [''];
  }


  deleteContent() {
    this.router.navigate(['/pages-body/handle-request/sprintDetails', this.sprintId, 'availableResourceList', this.sprintId]);
  }

  disableAllDates(): boolean {
    return true;
  }

  isHoliday(date: NgbDateStruct): boolean {
    return this.holidays.some(holiday =>
      holiday.year === date.year &&
      holiday.month === date.month &&
      holiday.day === date.day
    );
  }

  onCancelClick(): void {
    this.router.navigate(['/resource', this.sprintId, 'list']);
  }

}
