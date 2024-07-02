import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resetPasswordModel } from '../pageBody-model/resetPwrd';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PasswordService {

  private apiUrl = environment.baseUrl; // Global api URL

  constructor(private http : HttpClient) { }

    //Reset password
    resetPassword(resetPassword: resetPasswordModel): Observable<resetPasswordModel> {
      return this.http.post<resetPasswordModel>(`${this.apiUrl}/api/resetPassword`, resetPassword);
    }
}