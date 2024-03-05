import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAccComponent } from './login-acc/login-acc.component';  
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';

const routes: Routes = [
  //redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginAccComponent },
  { path: 'forgot-password', component: FgPsswdComponent },
  //redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  //wildcard route to handle 404
  //{ path: '**', component: PageNotFoundComponent } // PageNotFoundComponent needs to be created
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
