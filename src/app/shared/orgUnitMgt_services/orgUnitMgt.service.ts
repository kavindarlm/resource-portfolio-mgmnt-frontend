import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrganizationalUnitModel } from "../../orgUnitMgt/unit-form/unit-form.model";

@Injectable({
    providedIn: 'root'
})

export class OrgUnitMgtService {
    constructor(private http:HttpClient) {}

    getOrgUnits() {
        return this.http.get<OrganizationalUnitModel[]>("http://localhost:3000/org-unit");
    }
}