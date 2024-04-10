import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

   //service to get resources from the database

   private baseUrl = 'http://localhost:3000/resources'; // Adjust the port if needed

   constructor(private http: HttpClient) { }
 
   getResources(): Observable<any> {
     return this.http.get(`${this.baseUrl}`);
   }
}
