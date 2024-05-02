import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  
}
