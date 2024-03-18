import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { dataModel } from '../team-form/team-form.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  postTeam(data: any){
    return this.http.post('http://localhost:3000/teams', data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getTeam(){
    return this.http.get('http://localhost:3000/teams')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateTeam(data: any,id:number){
    return this.http.put('http://localhost:3000/teams/' + id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteTeam(id: number){
    return this.http.delete('http://localhost:3000/teams/' + id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  //fetch data
// fetchData(id: number) {
//   return this.http.get<dataModel>('http://localhost:3000/teams/' + id);
// }

fetchData(id: number) {
  return this.http.get<dataModel>('http://localhost:3000/teams/' + id);
}

//edit data
editTeams(data:dataModel, id:number){
  return this.http.put('http://localhost:3000/teams/' + id, data) ;
}

//delete data
deleteTeams(id: number){
  return this.http.delete('http://localhost:3000/teams/' + id);
}
}

