import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrganizationalUnitModel } from "../../orgUnitMgt/unit-form/unit-form.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class OrgUnitMgtService {

    selectedUnit: OrganizationalUnitModel | undefined;

    constructor(private http:HttpClient) {}

    setData(data: any) {
        this.selectedUnit = data;
    }

    getData(): any {
        return this.selectedUnit;
    }


    getOrgUnits() {
        return this.http.get<OrganizationalUnitModel[]>("http://localhost:3000/org-unit");
    }

    getOrgUnitById(id: number) {
        return this.http.get<OrganizationalUnitModel>("http://localhost:3000/org-unit/"+id)
    }

    createOrgUnit(data: OrganizationalUnitModel) {
        return this.http.post<OrganizationalUnitModel>("http://localhost:3000/org-unit", data);
    }

    updateOrgUnit(id: number, unitData: OrganizationalUnitModel) {
        return this.http.put<OrganizationalUnitModel>("http://localhost:3000/org-unit/"+id, unitData);
    }

    deleteOrgUnit(id: number): Observable<any> {
        return this.http.delete<any>("http://localhost:3000/org-unit/"+id);
    }
}