import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { dataModel } from "../../team-management/team-form/team-form.model";
import { projectDataModel } from "../projct-dshbrd-model/dshbrd-project";

@Injectable({
    providedIn: 'root'
})
export class ProjectDashboardService {
    constructor(private http: HttpClient){}

    getAllProject(): Observable<projectDataModel[]>{ 
        return this.http.get<projectDataModel[]>("http://localhost:3000/project");
      }
    
 //FetchProjectDetails
  fetchProjectbyId(id:string){ 
    return this.http.get<projectDataModel>("http://localhost:3000/project/"+id)
  }
}