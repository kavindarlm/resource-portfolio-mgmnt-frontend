import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { resetPasswordModel } from '../pageBody-model/resetPwrd';

@Injectable({
  providedIn: 'root'
})

export class PasswordService {
  constructor(private http : HttpClient) { }

    //Reset password
    resetPassword(resetPassword: resetPasswordModel): Observable<resetPasswordModel> {
      return this.http.post<resetPasswordModel>('http://localhost:3000/api/resetPassword', resetPassword);
    }
}