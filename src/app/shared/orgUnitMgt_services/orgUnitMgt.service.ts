import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { OrganizationalUnitModel } from "../../orgUnitMgt/unit-form/unit-form.model";
import { BehaviorSubject, Observable } from "rxjs";
import { OrgUnitRecrsive } from "../../orgUnitMgt/unit-tree/org-unitmodel";

@Injectable({
    providedIn: 'root'
})

export class OrgUnitMgtService {

    selectedUnit: OrganizationalUnitModel | undefined;

    //Event to update the unit-list
    unitListUpdated = new EventEmitter<void>();

    // This service is for fetching the project details after updating the project
    private refreshUnitfetch = new BehaviorSubject<void>(undefined);
    refreshUnitfetch$ = this.refreshUnitfetch.asObservable();

    refreshUnitfetchData() {
        this.refreshUnitfetch.next();
    }

    constructor(private http: HttpClient) { }

    setData(data: any) {
        this.selectedUnit = data;
    }

    getData(): any {
        return this.selectedUnit;
    }

    //Function to get org units
    getOrgUnits() {
        return this.http.get<OrganizationalUnitModel[]>("http://localhost:3000/org-unit");
    }

    //Function to get org units by ID
    getOrgUnitById(id: number) {
        return this.http.get<OrganizationalUnitModel>("http://localhost:3000/org-unit/" + id)
    }

    //Create org unit
    createOrgUnit(data: OrganizationalUnitModel) {
        return this.http.post<OrganizationalUnitModel>("http://localhost:3000/org-unit", data);
    }

    //Update org unit
    updateOrgUnit(id: number, unitData: OrganizationalUnitModel) {
        return this.http.put<OrganizationalUnitModel>("http://localhost:3000/org-unit/" + id, unitData);
    }

    //Delete Org unit
    deleteOrgUnit(id: number): Observable<any> {
        return this.http.delete<any>("http://localhost:3000/org-unit/" + id);
    }

    //Get Org unit hierarchy data
    getOrgUnitData(): Observable<any> {
        return this.http.get<any>("http://localhost:3000/org-unit/hierarchy/data")
    }

    //Function to check if the org unit has child units
    hasChildUnits(unitId: number): Observable<boolean> {
        return this.http.get<boolean>(`http://localhost:3000/org-unit/${unitId}/has-children`);
    }

    //Function to get ancestors of the org unit
    getAncestors(unitId: number): Observable<OrganizationalUnitModel[]> {
        return this.http.get<OrganizationalUnitModel[]>(`http://localhost:3000/org-unit/${unitId}/ancestors`);
    }

    //Function to get the parents of the org unit recursively
    getOrgUnitRecursiveData(unitId: number): Observable<OrgUnitRecrsive[]> {
        return this.http.get<OrgUnitRecrsive[]>("http://localhost:3000/org-unit/parent/" + unitId);
    }
}