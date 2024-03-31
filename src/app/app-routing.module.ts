import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAccComponent } from './login-acc/login-acc.component';
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { AdminDasbdBodyComponent } from './admin-dashboard/admin-dasbd-body/admin-dasbd-body.component';
import { ProjectListComponent } from './TaskManagement/project-list/project-list.component';
import { ProjectDetailsComponent } from './TaskManagement/project-details/project-details.component';
import { CreateNewtaskComponent } from './TaskManagement/create-newtask/create-newtask.component';

const routes: Routes = [
  //redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginAccComponent },
  { path: 'forgot-password', component: FgPsswdComponent },

  { path: 'admin-dashboard', component: AdminDasbdBodyComponent },
  { path: 'pages-body', component: PagesBodyComponent, children: [
  {
    path: 'projectList',
    component: ProjectListComponent,
    children: [
      {
        path: 'projectTaskDetails/:id',
        component: ProjectDetailsComponent,
        children: [{ path: 'newTask/:id', component: CreateNewtaskComponent }],
      },
    ],
  },
  ]
},
  //wildcard route to handle 404
  //{ path: '**', component: PageNotFoundComponent } // PageNotFoundComponent needs to be created
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
