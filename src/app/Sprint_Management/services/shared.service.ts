import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

interface ProjectTaskData {
  resourceId: string;
  taskId: string;
  percentage: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnDestroy {

  private dataSubject = new BehaviorSubject<ProjectTaskData[]>([]);
  data$ = this.dataSubject.asObservable();

  private sprintCreatedSubject = new Subject<void>();
  sprintCreated$ = this.sprintCreatedSubject.asObservable();

  private sprintDeletedSubject = new Subject<void>();
  sprintDeleted$ = this.sprintDeletedSubject.asObservable();

  private sprintUpdatedSubject = new Subject<void>();
  sprintUpdated$ = this.sprintUpdatedSubject.asObservable();

  private taskUpdatedSubject = new Subject<void>();
  taskUpdated$ = this.taskUpdatedSubject.asObservable();

  private resourceAllocationDeletedSubject = new Subject<void>();
  resourceAllocationDeleted$ = this.resourceAllocationDeletedSubject.asObservable();

  private percentageUpdatedSubject = new Subject<void>();
  percentageUpdated$ = this.percentageUpdatedSubject.asObservable();

  constructor() {}

  notifyResourceAllocationDeleted(): void {
    this.resourceAllocationDeletedSubject.next();
  }

  setData(data: ProjectTaskData[]): void {
    this.dataSubject.next(data);
  }

  addData(data: ProjectTaskData): void {
    const currentData = this.dataSubject.value;
    const updatedData = [...currentData, data];
    this.dataSubject.next(updatedData);
  }

  notifySprintCreated(): void {
    this.sprintCreatedSubject.next();
  }

  notifySprintDeleted(): void {
    this.sprintDeletedSubject.next();
  }

  notifySprintUpdated(): void {
    this.sprintUpdatedSubject.next();
  }

  notifyTaskUpdated(): void {
    this.taskUpdatedSubject.next();
  }

  notifyPercentageUpdated(): void {
    this.percentageUpdatedSubject.next();
  }

  private resourceAddedSubject = new Subject<void>();
  resourceAdded$ = this.resourceAddedSubject.asObservable();

  // Notify resource added
  notifyResourceAdded(): void {
    this.resourceAddedSubject.next();
  }

  // Clear state method (optional)
  clearData(): void {
    this.dataSubject.next([]);
  }

  ngOnDestroy(): void {
    // Complete the subjects to prevent memory leaks
    this.dataSubject.complete();
    this.sprintCreatedSubject.complete();
    this.sprintDeletedSubject.complete();
    this.sprintUpdatedSubject.complete();
    this.taskUpdatedSubject.complete();
    this.resourceAllocationDeletedSubject.complete();
    this.percentageUpdatedSubject.complete();
    this.resourceAddedSubject.complete();
  }


}
