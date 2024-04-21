import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { dataModel } from '../team-form/team-form.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }


  //post team data
  postTeam(data: dataModel) {
    return this.http.post<dataModel>('http://localhost:3000/teams', data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //get all teams by id
  getTeamById(id: number): Observable<dataModel> {
    const url = `http://localhost:3000/teams/${id}`;
    return this.http.get<dataModel>(url);
  }

  //update team data
  updateTeam(id: number, data: dataModel) {
    return this.http.put<dataModel>('http://localhost:3000/teams/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  //delete team data
  deleteTeam(id: number) {
    return this.http.delete('http://localhost:3000/teams/' + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }


  //get team by id
  fetchData(id: number) {
    return this.http.get<dataModel>('http://localhost:3000/teams/' + id);
  }

  //edit data
  editTeams(data: dataModel, id: number) {
    return this.http.put('http://localhost:3000/teams/' + id, data);
  }

  //delete data
  deleteTeams(id: number) {
    return this.http.delete('http://localhost:3000/teams/' + id);
  }
}

