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
// import { MainComponent } from './Sprint_Management/main/main.component';
// import { CreateFormComponent } from './Sprint_Management/create-form/create-form.component';
// import { SprintMgtComponent } from './Sprint_Management/sprint-mgt/sprint-mgt.component';
import { ListComponent } from './Sprint_Management/Reusable_Components/list/list.component';
import { CreateFormComponent } from './Sprint_Management/create-form/create-form.component';
import { AvailableResourceListComponent } from './Sprint_Management/available-resource-list/available-resource-list.component';
import { AddFormComponent } from './resourceMgt/add-form/add-form.component';
import { FirstViewComponent } from './resourceMgt/first-view/first-view.component';
import { ButtonComponent } from './resourceMgt/button/button.component';
import { ResourceDetailsComponent } from './resourceMgt/resource-details/resource-details.component';
import { ResourceEditFormComponent } from './resourceMgt/resource-edit-form/resource-edit-form.component';
import { AddNewUserComponent } from './admin-dashboard/add-new-user/add-new-user.component';
import { UserDetailComponent } from './admin-dashboard/user-detail/user-detail.component';
import { UpdateComponent } from './team-management/update/update.component';
import { TeamListComponent } from './team-management/team-list/team-list.component';
import { DeletePopupComponent } from './team-management/delete-popup/delete-popup.component';
import { SprintMgtComponent } from './Sprint_Management/sprint-mgt/sprint-mgt.component';
import { DeleteSprintPopupComponent } from './Sprint_Management/Reusable_Components/delete-sprint-popup/delete-sprint-popup.component';
import { AvailabiilityComponent } from './Sprint_Management/availabiility/availabiility.component';
import { UpdateResourcTableComponent } from './team-management/update-resourc-table/update-resourc-table.component';

const routes: Routes = [
  //redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginAccComponent },
  { path: 'forgot-password', component: FgPsswdComponent },
  {
    path: 'pages-body', component: PagesBodyComponent,
    children: [
      {
        path: 'projectlist', component: ProjectListComponent,
        children: [
          { path: 'createproject', component: CreateProjectComponent },
          { path: 'updatePoject/:id', component: UpdateProjectComponent }
        ]
      },
      {
        path: 'teamlistcomponent', component: TeamListComponent,
        children: [
          { path: 'NewTeamButton', component: NewTeamButtonComponent },
          { path: 'TeamForm', component: TeamFormComponent },
          { path: 'update/:id', component: UpdateComponent },
          { path: 'resources/:id', component: UpdateResourcTableComponent },
          { path: 'delete/:id', component: DeletePopupComponent }
        ]
      },
      {
        path: 'first-view', component: FirstViewComponent,
        children: [
          { path: 'button', component: ButtonComponent },
          { path: 'add-form', component: AddFormComponent },
          {
            path: 'resource-details', component: ResourceDetailsComponent,
            children: [
              { path: 'resouce-edit-form', component: ResourceEditFormComponent }
            ]
          },
        ]
      },
      {
        path: 'sprint-management', component: ListComponent,
        children: [
          {
            path: 'createform', component: CreateFormComponent,
            children: [
              {
                path: 'availableResources', component: AvailableResourceListComponent,
                children: [
                  { path: 'availability/:id', component: AvailabiilityComponent }]
              }
            ]
          },
          {
            path: 'sprintmgt/:Sname', component: SprintMgtComponent,
            children: [
              { path: 'deleteSprint/:Sname', component: DeleteSprintPopupComponent }
            ]
          },

        ]
      },
    ]
  },
  {
    path: 'admin-dashboard', component: AdminDasbdBodyComponent,
    children: [
      { path: 'addNewUser', component: AddNewUserComponent },
      { path: 'userDetail/:id', component: UserDetailComponent }
    ]
  }
]; 


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
