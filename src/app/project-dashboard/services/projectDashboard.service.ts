import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { dataModel } from "../../team-management/team-form/team-form.model";
import { projectDataModel, resourceDataModel } from "../projct-dshbrd-model/dshbrd-project";

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

  //FetchResourceList
  fetchResourceList(id:string){
    return this.http.get<resourceDataModel>("http://localhost:3000/task/project/"+id+"/resources")
  }

  //Fetch Project Progress
  fetchProjectProgress(id:string){
    return this.http.get("http://localhost:3000/task/project-progress/"+id)
  }

  //Fetch Count of Created Projects
  getCreatedProjects(){
    return this.http.get("http://localhost:3000/project/count/countprojects")
  }

  //Search Project
  searchProject(projectName: string){
    const params = new HttpParams().set('s', projectName);
    return this.http.get<projectDataModel[]>("http://localhost:3000/project/searchprojectName/search", {params});
  }
}