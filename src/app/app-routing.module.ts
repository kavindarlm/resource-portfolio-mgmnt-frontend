import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTeamButtonComponent } from './team-management/new-team-button/new-team-button.component';
import { TeamFormComponent } from './team-management/team-form/team-form.component';
import { LoginAccComponent } from './login-acc/login-acc.component';  
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { AdminDasbdBodyComponent } from './admin-dashboard/admin-dasbd-body/admin-dasbd-body.component';
import { UpdateComponent } from './team-management/update/update.component';
import { TeamListComponent } from './team-management/team-list/team-list.component';
import { DeletePopupComponent } from './team-management/delete-popup/delete-popup.component';

const routes: Routes = [
  {
    path: '',
    component: PagesBodyComponent,
    children: [
      {
        path: 'teamlistcomponent',
        component: TeamListComponent,
        children: [
          { path: 'TeamForm', component: TeamFormComponent },
          { path: 'update/:id', component: UpdateComponent },
          { path: 'delete/:id', component: DeletePopupComponent }
        ]
      },
      
    ]
  }
];
  //redirect to login page
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginAccComponent },
  // { path: 'forgot-password', component: FgPsswdComponent },
  // { path: 'pages-body', component: PagesBodyComponent },
  // { path: 'admin-dashboard', component: AdminDasbdBodyComponent},
  // {path: 'NewTeamButton', component: NewTeamButtonComponent},
  // {path: 'TeamForm', component: TeamFormComponent},
  // {path:'update/:id', component: UpdateComponent}  
  

  // const routes: Routes = [
//   {path: 'NewTeamButton', component: NewTeamButtonComponent},
//   {path: 'TeamForm', component: TeamFormComponent},
// ];
  //wildcard route to handle 404
  //{ path: '**', component: PageNotFoundComponent } // PageNotFoundComponent needs to be created


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
