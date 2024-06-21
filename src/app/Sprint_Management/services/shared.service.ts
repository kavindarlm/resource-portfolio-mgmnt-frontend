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

  // Define a BehaviorSubject to hold an array of data
  private dataSubject = new BehaviorSubject<ProjectTaskData[]>([]);

  // Observable for the data subject
  data$ = this.dataSubject.asObservable();

  // Subject for notifying sprint creation
  private sprintCreatedSubject = new Subject<void>();

  // Observable for the sprint creation subject
  sprintCreated$ = this.sprintCreatedSubject.asObservable();

  // Subject for notifying sprint deletion
  private sprintDeletedSubject = new Subject<void>();

  // Observable for the sprint deletion subject
  sprintDeleted$ = this.sprintDeletedSubject.asObservable();

  // Subject for notifying sprint update
  private sprintUpdatedSubject = new Subject<void>();

  // Observable for the sprint update subject
  sprintUpdated$ = this.sprintUpdatedSubject.asObservable();

  // Subject for notifying task update
  private taskUpdatedSubject = new Subject<void>();

  // Observable for the task update subject
  taskUpdated$ = this.taskUpdatedSubject.asObservable();

  // Method to set an array of data
  setData(data: ProjectTaskData[]): void {
    this.dataSubject.next(data);
  }

  addData(data: ProjectTaskData): void {
    // Get the current data array
    const currentData = this.dataSubject.value;
  
    // Append the new data object
    const updatedData = [...currentData, data];
  
    // Update the data subject with the new array
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
