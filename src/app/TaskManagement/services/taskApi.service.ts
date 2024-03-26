import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { projectModel } from "../dataModels/projectModel";

@Injectable({
    providedIn: 'root'
})
export class taskApiService{
    constructor(private http:HttpClient){}

    //getprojectList
    //GetProjectDetails
  getProjectList(){ 
    // return this.http.get<datamodel[]>("http://localhost:3000/posts");
    return this.http.get<projectModel[]>("http://localhost:3000/project");
  }
}