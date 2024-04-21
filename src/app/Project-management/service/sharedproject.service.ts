import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class sharedprojectService {
    // This service is for refresh the project list afte adding a new project
    private refreshProjectListSource = new BehaviorSubject<void>(undefined);
    refreshProjectList$ = this.refreshProjectListSource.asObservable();

    refreshProjectList() {
        this.refreshProjectListSource.next();
    }

    // This service is for refresh the projectCount after adding deleting or editting a project
    private refreshProjectCountSource = new BehaviorSubject<void>(undefined);
    refreshProjectCount$ = this.refreshProjectCountSource.asObservable();

    refreshProjectCount() {
        this.refreshProjectCountSource.next();
    }

    // This service is for fetching the project details after updating the project
    private refreshProjectfetch = new BehaviorSubject<void>(undefined);
    refreshProjectfetch$ = this.refreshProjectfetch.asObservable();

    refreshProjectfetchData() {
        this.refreshProjectfetch.next();
    }
}