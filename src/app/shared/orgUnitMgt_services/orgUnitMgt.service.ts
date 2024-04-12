import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrganizationalUnitModel } from "../../orgUnitMgt/unit-form/unit-form.model";

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

    createOrgUnit(data: OrganizationalUnitModel) {
        return this.http.post<OrganizationalUnitModel>("http://localhost:3000/org-unit", data);
    }
}