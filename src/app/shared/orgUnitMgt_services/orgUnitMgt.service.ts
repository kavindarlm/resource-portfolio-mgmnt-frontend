import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { OrganizationalUnitModel } from "../../orgUnitMgt/unit-form/unit-form.model";
import { OrgUnitRecrsive } from "../../orgUnitMgt/unit-tree/org-unitmodel";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class OrgUnitMgtService {
    private apiUrl = environment.baseUrl +'/org-unit'; // Global API URL
    selectedUnit: OrganizationalUnitModel | undefined;

    // Event to update the unit-list
    unitListUpdated = new EventEmitter<void>();

    // This service is for fetching the project details after updating the project
    private refreshUnitfetch = new BehaviorSubject<void>(undefined);
    refreshUnitfetch$ = this.refreshUnitfetch.asObservable();

    constructor(private http: HttpClient) { }

    refreshUnitfetchData() {
        this.refreshUnitfetch.next();
    }

    setData(data: any) {
        this.selectedUnit = data;
    }

    getData(): any {
        return this.selectedUnit;
    }

    //Function to get org units
    getOrgUnits() {
        return this.http.get<OrganizationalUnitModel[]>(`${this.apiUrl}`);
    }

    //Function to get org units by ID
    getOrgUnitById(id: number) {
        return this.http.get<OrganizationalUnitModel>(`${this.apiUrl}/${id}`);
    }

    //Create org unit
    createOrgUnit(data: OrganizationalUnitModel) {
        return this.http.post<OrganizationalUnitModel>(`${this.apiUrl}`, data);
    }

    //Update org unit
    updateOrgUnit(id: number, unitData: OrganizationalUnitModel) {
        return this.http.put<OrganizationalUnitModel>(`${this.apiUrl}/${id}`, unitData);
    }

    //Delete Org unit
    deleteOrgUnit(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    //Get Org unit hierarchy data
    getOrgUnitData(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/hierarchy/data`);
    }

    //Function to check if the org unit has child units
    hasChildUnits(unitId: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/${unitId}/has-children`);
    }

    //Function to get ancestors of the org unit
    getAncestors(unitId: number): Observable<OrganizationalUnitModel[]> {
        return this.http.get<OrganizationalUnitModel[]>(`${this.apiUrl}/${unitId}/ancestors`);
    }

    //Function to get the parents of the org unit recursively
    getOrgUnitRecursiveData(unitId: number): Observable<OrgUnitRecrsive[]> {
        return this.http.get<OrgUnitRecrsive[]>(`${this.apiUrl}/parent/${unitId}`);
    }
}