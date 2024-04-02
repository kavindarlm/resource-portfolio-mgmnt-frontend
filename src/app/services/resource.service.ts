// resource.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = 'http://localhost:3000/resource'; 

  constructor(private http: HttpClient) { }

  getResources(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  
}
