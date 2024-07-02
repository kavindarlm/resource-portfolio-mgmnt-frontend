import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { dataModel } from '../team-form/team-form.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl = environment.baseUrl +'/teams'; // Global base URL

  constructor(private http: HttpClient) { }

  //post team data
  postTeam(data: dataModel) {
    return this.http.post<dataModel>(`${this.baseUrl}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //get all teams by id
  getTeamById(id: number): Observable<dataModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<dataModel>(url);
  }

  //update team data
  updateTeam(id: number, data: dataModel) {
    return this.http.put<dataModel>(`${this.baseUrl}/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //delete team data
  deleteTeam(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //get team by id
  fetchData(id: number) {
    return this.http.get<dataModel>(`${this.baseUrl}/${id}`);
  }

  //edit data
  editTeams(data: dataModel, id: number) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  //delete data
  deleteTeams(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}