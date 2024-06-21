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
import { ProjectDetailsComponent } from './TaskManagement/project-details/project-details.component';
import { CreateNewtaskComponent } from './TaskManagement/create-newtask/create-newtask.component';
import { UpdateTaskComponent } from './TaskManagement/update-task/update-task.component';
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
import { AvailabiilityComponent } from './Sprint_Management/availabiility/availabiility.component';
import { UpdateResourcTableComponent } from './team-management/update-resourc-table/update-resourc-table.component';
import { ProjectBoardComponent } from './project-dashboard/project-board/project-board.component';
import { TaskProjectListComponent } from './TaskManagement/task-project-list/task-project-list.component';
import { CalenderMainBoxComponent } from './calender-management/calender-main-box/calender-main-box.component';
import { CalenderTypeComponent } from './calender-management/calender-type/calender-type.component';
import { CommonCalenderComponent } from './calender-management/common-calender/common-calender.component';
import { ResourceListComponent } from './calender-management/resource-list/resource-list.component';
import { ResourceLeaveComponent } from './calender-management/resource-leave/resource-leave.component';
import { DashbrdProjectDetailsComponent } from './project-dashboard/dashbrd-project-details/dashbrd-project-details.component';
import { AuthGuard } from './guard/auth.guard';
import { FunctionGuardService } from './guard/function.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllocatedResourceInformationComponent } from './Sprint_Management/allocated-resource-information/allocated-resource-information.component';
import { UpdatePercentageComponent } from './Sprint_Management/update-percentage/update-percentage.component';
import { DeleteResourceAllocationComponent } from './Sprint_Management/delete-resource-allocation/delete-resource-allocation.component';
import { UpdateTaskInSprintComponent } from './Sprint_Management/update-task-in-sprint/update-task-in-sprint.component';
import { UnitListComponent } from './orgUnitMgt/unit-list/unit-list.component';
import { UnitTreeComponent } from './orgUnitMgt/unit-tree/unit-tree.component';
import { UnitNodeComponent } from './orgUnitMgt/unit-node/unit-node.component';
import { UnitFormComponent } from './orgUnitMgt/unit-form/unit-form.component';
import { UnitDetailsComponent } from './orgUnitMgt/unit-details/unit-details.component';
import { UnitEditFormComponent } from './orgUnitMgt/unit-edit-form/unit-edit-form.component';
import { EditTaskComponent } from './TaskManagement/edit-task/edit-task.component';
import { WellcomeMessageComponent } from './PageBody/wellcome-message/wellcome-message.component';
import { EditSprintFormComponent } from './Sprint_Management/edit-sprint-form/edit-sprint-form.component';
import { SprintListComponent } from './Handle_Request/sprint-list/sprint-list.component';
import { ResourceTableComponent } from './team-management/resource-table/resource-table.component';

const routes: Routes = [
  //redirect to login page
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginAccComponent },
  { path: 'forgot-password', component: FgPsswdComponent },
  {
    path: 'pages-body', component: PagesBodyComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] },
    children: [
      {
        path: 'welcome-page', component: WellcomeMessageComponent,
      },
      { path: 'projectBoard', component: ProjectBoardComponent,
      canActivate:[FunctionGuardService],
      data : { functionId : 1},
        children: [
          { path: 'dashboard-projectdetails/:id', component: DashbrdProjectDetailsComponent }
        ]
      },
      {
        path: 'projectlist', component: ProjectListComponent,
        canActivate: [FunctionGuardService],
        data: { functionId: 6 },
        children: [
          { path: 'createproject', component: CreateProjectComponent },
          { path: 'updatePoject/:id', component: UpdateProjectComponent }
        ]
      },
      {
        path: 'TaskProjectList', component: TaskProjectListComponent,
        canActivate: [FunctionGuardService],
        data: { functionId: 7 },
        children: [
          {
            path: 'projectTaskDetails/:projectId', component: ProjectDetailsComponent,
            children: [
              { path: 'newTask/:id', component: CreateNewtaskComponent },
              {
                path: 'updatetask/:id', component: UpdateTaskComponent,
                children: [
                  { path: 'editTask/:id', component: EditTaskComponent }
                ]
              }
            ],
          },
        ],
      },
      {
        path: 'teamlistcomponent', component: TeamListComponent,
        canActivate: [FunctionGuardService],
        data: { functionId: 5 },
        children: [
          { path: 'NewTeamButton', component: NewTeamButtonComponent },
          { path: 'TeamForm', component: TeamFormComponent ,
          children: [
            { path: 'resourceTable', component:ResourceTableComponent}
          ]
          },
          { path: 'update/:id', component: UpdateComponent },
          { path: 'resources/:id', component: UpdateResourcTableComponent },
          { path: 'delete/:id', component: DeletePopupComponent }
        ]
      },
      {
        path: 'calendertypecomponent', component: CalenderTypeComponent,
        canActivate: [FunctionGuardService],
        data: { functionId: 4 },
        children: [
          { path: 'calendermainbox', component: CalenderMainBoxComponent },
          { path: 'commoncalender/:type', component: CommonCalenderComponent },
          {
            path: 'resourcelist', component: ResourceListComponent,
            children: [
              { path: 'resourceleave/:id', component: ResourceLeaveComponent }
            ]
          }

        ]

      },
      {
        path: 'first-view', component: FirstViewComponent,
        canActivate: [FunctionGuardService],
        data: { functionId: 2 },
        children: [
          { path: 'button', component: ButtonComponent },
          { path: 'add-form', component: AddFormComponent },
          {
            path: 'resource-details/:id', component: ResourceDetailsComponent,
            children: [
              { path: 'resouce-edit-form/:id', component: ResourceEditFormComponent }
            ]
          },
        ]
      },
      {
        path: 'unit-list', component: UnitListComponent,
        canActivate: [FunctionGuardService],
        data: { functionId: 3 },
        children: [
          { path: 'unit-form', component: UnitFormComponent },
          {
            path: 'unit-details/:id', component: UnitDetailsComponent,
            children: [
              { path: 'unit-edit-form/:id', component: UnitEditFormComponent }
            ]
          },
          {
            path: 'unit-tree', component: UnitTreeComponent,
            children: [
              { path: 'unit-node', component: UnitNodeComponent }
            ]
          }
        ]
      },
      {
        path: 'sprint-management', component: ListComponent,
        canActivate: [FunctionGuardService],
        data: { functionId: 8 },
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
            path: 'sprintmgt/:id', component: SprintMgtComponent,
            children: [
              {
                path: 'allocated-resource/:sprintId/:resourceId', component: AllocatedResourceInformationComponent,
                children: [
                  { path: 'DeleteAllocation/:sprintId/:resourceId', component: DeleteResourceAllocationComponent },

                ]
              },
              { path: 'UpdatePercentage/:sprintId/:resourceId', component: UpdatePercentageComponent, },
              { path: 'UpdateTask/:sprintId/:resourceId', component: UpdateTaskInSprintComponent, },
              { path: 'EditSprint/:sprintId', component: EditSprintFormComponent, }
            ]
          },
        ]
      },
      {
        path: 'handle-request', component: SprintListComponent,
        canActivate: [FunctionGuardService],
        data: { functionId: 9 },
        children: [
          {
            path: 'sprintmgt/:id', component: SprintMgtComponent,
            children: [
              {
                path: 'allocated-resource/:sprintId/:resourceId', component: AllocatedResourceInformationComponent,
                children: [
                  { path: 'DeleteAllocation/:sprintId/:resourceId', component: DeleteResourceAllocationComponent },

                ]
              },
              { path: 'UpdatePercentage/:sprintId/:resourceId', component: UpdatePercentageComponent, },
              { path: 'UpdateTask/:sprintId/:resourceId', component: UpdateTaskInSprintComponent, },
              { path: 'EditSprint/:sprintId', component: EditSprintFormComponent, }
            ]
          }]
      }
    ]
  },
  {
    path: 'admin-dashboard', component: AdminDasbdBodyComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    children: [
      { path: 'addNewUser', component: AddNewUserComponent },
      { path: 'userDetail/:id', component: UserDetailComponent }
    ]
  },
  {
    path: 'page-not-found', component: PageNotFoundComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
