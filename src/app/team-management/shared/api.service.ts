import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { dataModel } from '../team-form/team-form.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  delete(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }


  postTeam(data: dataModel){
    return this.http.post<dataModel>('/teams', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getTeam(){
    return this.http.get<dataModel[]>('/teams')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateTeam(id: number, data: dataModel){
    return this.http.put<dataModel>('/teams/' + id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteTeam(id: number){
    return this.http.delete('/teams/' + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  //fetch data
// fetchData(id: number) {
//   return this.http.get<dataModel>('http://localhost:3000/teams/' + id);
// }

fetchData(id: number) {
  return this.http.get<dataModel>('/teams/' + id);
}

//edit data
editTeams(data:dataModel, id:number){
  return this.http.put('/teams/' + id, data) ;
}

//delete data
deleteTeams(id: number){
  return this.http.delete('/teams/' + id);
}
}

