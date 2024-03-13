import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './Project-management/create-project/create-project.component';
import { ProjectListComponent } from './Project-management/project-list/project-list.component';
import { UpdateProjectComponent } from './Project-management/update-project/update-project.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import path from 'node:path';

const routes: Routes = [
  { path: '', component: PagesBodyComponent,
    children:[
      {path: 'projectlist', component: ProjectListComponent,
      children:[
        {path: 'createproject', component: CreateProjectComponent}, 
        {path: 'updatePoject/:id', component: UpdateProjectComponent}
      ]},
    ]
}
];
import { LoginAccComponent } from './login-acc/login-acc.component';  
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
// import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { AdminDasbdBodyComponent } from './admin-dashboard/admin-dasbd-body/admin-dasbd-body.component';

// const routes: Routes = [
//   //redirect to login page
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginAccComponent },
//   { path: 'forgot-password', component: FgPsswdComponent },
//   { path: 'pages-body', component: PagesBodyComponent },
//   { path: 'admin-dashboard', component: AdminDasbdBodyComponent}
  
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]       
})
export class AppRoutingModule {}
 