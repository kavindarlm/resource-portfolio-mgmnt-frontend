import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class taskSharedService{
 //This service is to refresh the taskList after adding updating a new task
 private refreshTaskListSource = new BehaviorSubject<void>(undefined);
 refreshTaskList$ = this.refreshTaskListSource.asObservable();

 refreshTaskList(){
    this.refreshTaskListSource.next();
 }
 //This service is to refresh the project and task Details after clicking a project
    private refreshProjectDetailsSource = new BehaviorSubject<void>(undefined);
    refreshProjectDetails$ = this.refreshProjectDetailsSource.asObservable();

    refreshProjectDetails(){
        this.refreshProjectDetailsSource.next();
    }
}