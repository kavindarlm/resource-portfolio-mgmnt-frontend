//This file is until the orgUnit management feature is merged. there's another service file there and get the 
//org units from that service file then
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OrgUnitModel } from "../../resourceMgt/add-form/addformmodel";

@Injectable({
    providedIn: 'root'
  })

  export class OrgUnitService {

    constructor(private http:HttpClient) {}

    getOrgUnits() {
        return this.http.get<OrgUnitModel[]>("http://localhost:3000/org-unit");
      }
  }