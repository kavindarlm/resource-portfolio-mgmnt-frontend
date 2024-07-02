import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

interface ProjectTaskData {
  resourceId: string;
  taskId: string;
  percentage: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {

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
}
