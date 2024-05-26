import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from '../admin-dashboard/admin-dashboard-services/dashboard.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FunctionGuardService implements CanActivate {
  constructor(private router: Router , private dashboardService : DashboardService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    // Get the user ID from local storage
    const userId = Number(localStorage.getItem('userId'));
    
    // Get the function IDs
    return this.getUserFunctions(userId).pipe(
      map(functionIds => {
        // Check if the user has the required function ID
        const requiredFunctionId = route.data['functionId'];
        if (functionIds.includes(requiredFunctionId)) {
          // If the user has the required function ID, allow navigation
          return true;
        } else {
          // If the user does not have the required function ID, redirect to an error page
          this.router.navigate(['/page-not-found']);
          return false;
        }
      })
    );
  }

  getUserFunctions(userId: number): Observable<Number[]> {
    return new Observable(observer => {
      this.dashboardService.getUserFunction(userId).subscribe((data: any) => {
        observer.next(data.functionIds);
        observer.complete();
      });
    });
  }
}
