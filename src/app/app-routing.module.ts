import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAccComponent } from './login-acc/login-acc.component';  
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { AdminDasbdBodyComponent } from './admin-dashboard/admin-dasbd-body/admin-dasbd-body.component';
// import { MainComponent } from './Sprint_Management/main/main.component';
// import { CreateFormComponent } from './Sprint_Management/create-form/create-form.component';
// import { SprintMgtComponent } from './Sprint_Management/sprint-mgt/sprint-mgt.component';
import { ListComponent } from './Sprint_Management/Reusable_Components/list/list.component';

const routes: Routes = [
  //redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginAccComponent },
  { path: 'forgot-password', component: FgPsswdComponent },
  { path: 'pages-body', component: PagesBodyComponent },
  { path: 'admin-dashboard', component: AdminDasbdBodyComponent},

  { path: 'sprint-management', component: ListComponent},
  // { path: 'create-sprint', component: CreateFormComponent},
  // { path: 'sprint-mgt', component:SprintMgtComponent}

  

  
  //wildcard route to handle 404
  //{ path: '**', component: PageNotFoundComponent } // PageNotFoundComponent needs to be created
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
