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

    getOrgUnits() {
        return this.http.get<OrganizationalUnitModel[]>(`${this.apiUrl}`);
    }

    getOrgUnitById(id: number) {
        return this.http.get<OrganizationalUnitModel>(`${this.apiUrl}/${id}`);
    }

    createOrgUnit(data: OrganizationalUnitModel) {
        return this.http.post<OrganizationalUnitModel>(`${this.apiUrl}`, data);
    }

    updateOrgUnit(id: number, unitData: OrganizationalUnitModel) {
        return this.http.put<OrganizationalUnitModel>(`${this.apiUrl}/${id}`, unitData);
    }

    deleteOrgUnit(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    getOrgUnitData(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/hierarchy/data`);
    }

    hasChildUnits(unitId: number): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/${unitId}/has-children`);
    }

    getAncestors(unitId: number): Observable<OrganizationalUnitModel[]> {
        return this.http.get<OrganizationalUnitModel[]>(`${this.apiUrl}/${unitId}/ancestors`);
    }

    getOrgUnitRecursiveData(unitId: number): Observable<OrgUnitRecrsive[]> {
        return this.http.get<OrgUnitRecrsive[]>(`${this.apiUrl}/parent/${unitId}`);
    }
}