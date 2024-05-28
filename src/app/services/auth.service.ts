import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DashboardService } from '../admin-dashboard/admin-dashboard-services/dashboard.service';

export interface LoginResponse {
  user_id: number;
  token: string;
  user_role: string;
  user_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private readonly tokenExpirationPeriod = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

  constructor(private http: HttpClient, private router: Router , private dashboardservice : DashboardService) { }

  // function to login
  login(user_email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/api/login', {
      user_email,
      password
    }, { observe: 'response' }).pipe(
      map(response => response.body as LoginResponse), // map HttpResponse to its body
      tap((body: LoginResponse) => {
        if (body !== null) {
          localStorage.setItem('userId', body.user_id.toString()); // Save the user ID in local storage
          localStorage.setItem(this.tokenKey, body.token); // Save the token in local storage
          localStorage.setItem('user_role', body.user_role); // Save the user role in local storage
          localStorage.setItem('user_name', body.user_name); // Save the user name in local storage
          console.log(localStorage.getItem('userId')); // Check if the user ID is saved in local storage
          // console.log(localStorage.getItem(this.tokenKey)); // Check if the token is saved in local storage
          const now = new Date();
          localStorage.setItem('tokenTimestamp', now.getTime().toString());
          if (body.user_role === 'admin') {
            this.router.navigate(['./admin-dashboard']);
          }
          else if (body.user_role === 'user') {
              this.router.navigate(['./pages-body']);
          }
        }
      })
    );
  }

  // function to logout
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // function to check if the user is logged in
  isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token !== null && token.length > 0;
  }

  // function to get the user role
  getUserRole(): string | null {
    console.log(localStorage.getItem('user_role'));
    return this.isLoggedIn() ? localStorage.getItem('user_role') : null;
  }

  // function to get the user ID
  getUserId(): number | null {
    return this.isLoggedIn() ? Number(localStorage.getItem('userId')) : null;
  }
  
  // function to get the user name
  getUserName(): string | null {
    return this.isLoggedIn() ? localStorage.getItem('user_name') : null;
  }

  // function to get the token
  getToken(): string | null {
    if (!this.isLoggedIn()) {
      return null;
    }
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    const now = new Date();

    // If the token is expired
    if (now.getTime() - Number(tokenTimestamp) > this.tokenExpirationPeriod) {
      // Clear the token and the timestamp
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('tokenTimestamp');

      // Redirect to the login page
      this.router.navigate(['/login']);
      return null;
    }
    return localStorage.getItem(this.tokenKey);
  }

  // Function to forgot password
  forgotPassword(user_email: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/forgotPassword', {
      user_email
    }).pipe(
      tap(response => {
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }


}