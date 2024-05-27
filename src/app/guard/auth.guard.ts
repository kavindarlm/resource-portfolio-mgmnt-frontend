import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getUserRole();

      if (next.data['roles'] && next.data['roles'].indexOf(userRole) === -1) {
        // role not authorised so redirect to 404 page
        this.router.navigate(['/page-not-found']);
        return false;
      }

      // authorised so return true
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}