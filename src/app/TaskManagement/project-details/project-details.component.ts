import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { taskApiService } from '../services/taskApi.service';
import {
  ResourceNameandId,
  projectModel,
  taskModel,
} from '../dataModels/projectModel';
import { taskSharedService } from '../services/taskshared.service';
import { Subscription, catchError, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  constructor(
    private activateDataRout: ActivatedRoute,
    private api: taskApiService,
    private shared: taskSharedService,
    private spinner: NgxSpinnerService
  ) {}

  // Define the dataid property
  public dataid!: string;

  // Define the projectData and TaskData properties
  projectData: projectModel | undefined;
  TaskData: taskModel[] | undefined;
  allcationSum!: number;
  projectProgress: number | null = null;
  errorMessage: string | null = null;
  resoureIdAndName: ResourceNameandId | undefined;
  delivaryMangerId!: string;
  criticalityName!: string;

  // Define the subscription and subscriptionTwo properties
  private subscription!: Subscription;
  private subscriptionTwo!: Subscription;

  // Pagination variables
  currentPage = 1;
  itemsPerPage = 8;
  totalPages = 0;
  totalPagesArray: number[] = [];
  TaskDataSlice: taskModel[] = [];

  // Search text variable
  searchText = '';

  ngOnInit(): void {
    // Get the project id from the route
    this.activateDataRout.paramMap.subscribe((param: Params) => {
      this.dataid = param['get']('projectId');
    });

    // Subscribe to refresh events
    this.subscriptionTwo = this.shared.refreshProjectDetails$.subscribe(() => {
      this.getProjectDetails();
      this.getTaskList();
      this.getProjectTaskSum();
      this.getProjectProgress();
    });

    this.subscription = this.shared.refreshTaskList$.subscribe(() => {
      this.getTaskList();
      this.getProjectTaskSum();
      this.getProjectProgress();
    });

    // Initialize component
    this.getTaskList();
    this.getProjectDetails();
    this.getProjectTaskSum();
    this.getProjectProgress();

    // Set project ID in shared service
    this.shared.setProjectId(this.dataid);
  }

  // Fetch project details
  getProjectDetails() {
    this.api.fetchProject(this.dataid).subscribe((data: projectModel) => {
      this.spinner.show();
      this.projectData = data;
      this.delivaryMangerId = data.deliveryManager_id;
      this.getResourceName();
      this.getCriticalityName(data.criticality_id);
      this.spinner.hide();
    });
  }

  // Fetch task list
  getTaskList() {
    this.api.getTaskList(this.dataid).subscribe((res) => {
      this.spinner.show();
      this.TaskData = res;
      this.calculateTotalPages();
      this.paginateTasks();
      this.spinner.hide();
    });
  }

  // Select task by ID
  selectTaskbyId(taskid: string) {
    console.log('Selected task id:', taskid);
    this.shared.refreshTaskList();
  }

  // Get sum of task allocation percentage
  getProjectTaskSum() {
    this.api.getProjectTaskSumByProjectId(this.dataid).subscribe((res) => {
      this.spinner.show();
      this.allcationSum = res;
      this.spinner.hide();
    });
  }

  // Get project progress
  getProjectProgress() {
    this.api
      .getProjectProgress(this.dataid)
      .pipe(
        catchError((error) => {
          this.errorMessage = 'Failed to fetch project progress';
          console.error('Error fetching project progress:', error);
          return of(null); // Return a null observable to continue the stream
        })
      )
      .subscribe((res) => {
        if (res !== null) {
          this.projectProgress = this.formatToTwoDecimalPlaces(res);
        }
      });
  }

  // Format number to two decimal places
  formatToTwoDecimalPlaces(value: number): number {
    return parseFloat(value.toFixed(2));
  }

 // Frontend search based on task name
onSearchChange() {
  // Trim leading and trailing whitespace from search text
  const searchText = this.searchText.trim().toLowerCase();

  if (!searchText) {
    // If search text is empty, reload the full task list
    this.getTaskList();
  } else {
    // Filter tasks based on search text anywhere in task name
    if (this.TaskData) {
      this.TaskData = this.TaskData.filter(task =>
        task.taskName.toLowerCase().includes(searchText)
      );
      this.calculateTotalPages();
      this.paginateTasks();
    }
  }
}

  // Get resource name by ID
  getResourceName() {
    this.api
      .getResourceNameByResourceId(this.delivaryMangerId)
      .subscribe((res) => {
        this.spinner.show();
        this.resoureIdAndName = res;
        this.spinner.hide();
      });
  }

  // Get criticality name by ID
  getCriticalityName(criticality_id: string | number) {
    if (criticality_id === 3) {
      this.criticalityName = 'Low';
    } else if (criticality_id === 2) {
      this.criticalityName = 'Medium';
    } else if (criticality_id === 1) {
      this.criticalityName = 'High';
    } else {
      this.criticalityName = 'Not Set';
    }
  }

  // Calculate total pages for pagination
  calculateTotalPages() {
    if (this.TaskData && this.TaskData.length > 0) {
      this.totalPages = Math.ceil(this.TaskData.length / this.itemsPerPage);
    } else {
      this.totalPages = 0;
    }
    this.totalPagesArray = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  // Paginate tasks based on current page
  paginateTasks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    if (this.TaskData) {
      this.TaskDataSlice = this.TaskData.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    }
  }
}
