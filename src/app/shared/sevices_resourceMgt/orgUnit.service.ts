
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrgUnitModel } from "../../resourceMgt/add-form/addformmodel";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
  })

  export class OrgUnitService {

    private baseUrl = environment.baseUrl; // Global base URL for org units

    constructor(private http:HttpClient) {}

    getOrgUnits() {
        return this.http.get<OrgUnitModel[]>(`${this.baseUrl}/org-unit`);
      }
  }