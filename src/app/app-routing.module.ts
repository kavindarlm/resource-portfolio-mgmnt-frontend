import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTeamButtonComponent } from './team-management/new-team-button/new-team-button.component';
import { TeamFormComponent } from './team-management/team-form/team-form.component';
import { CreateProjectComponent } from './Project-management/create-project/create-project.component';
import { ProjectListComponent } from './Project-management/project-list/project-list.component';
import { UpdateProjectComponent } from './Project-management/update-project/update-project.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import path from 'node:path';
import { LoginAccComponent } from './login-acc/login-acc.component';  
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
import { AdminDasbdBodyComponent } from './admin-dashboard/admin-dasbd-body/admin-dasbd-body.component';
import { AddNewUserComponent } from './admin-dashboard/add-new-user/add-new-user.component';
import { UserDetailComponent } from './admin-dashboard/user-detail/user-detail.component';
import { UpdateComponent } from './team-management/update/update.component';
import { TeamListComponent } from './team-management/team-list/team-list.component';
import { DeletePopupComponent } from './team-management/delete-popup/delete-popup.component';


const routes: Routes = [
  //redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginAccComponent },
  { path: 'forgot-password', component: FgPsswdComponent },
  { path: 'pages-body', component: PagesBodyComponent,
    children:[
      {path: 'projectlist', component: ProjectListComponent,
      children:[
        {path: 'createproject', component: CreateProjectComponent}, 
        {path: 'updatePoject/:id', component: UpdateProjectComponent}
      ]},
      {path: 'teamlistcomponent',component: TeamListComponent,
        children: [
          { path: 'TeamForm', component: TeamFormComponent },
          { path: 'update/:id', component: UpdateComponent },
          { path: 'delete/:id', component: DeletePopupComponent }
        ]},
    ]
  },
  { path: 'admin-dashboard', component: AdminDasbdBodyComponent,
    children: [
      {path: 'addNewUser', component: AddNewUserComponent},
      {path: 'userDetail/:id' , component:UserDetailComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]       
})
export class AppRoutingModule {}
 