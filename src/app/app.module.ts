import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CreateNewtaskComponent } from './TaskManagement/create-newtask/create-newtask.component';
import { ProjectDetailsComponent } from './TaskManagement/project-details/project-details.component';
import { UpdateTaskComponent } from './TaskManagement/update-task/update-task.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFormComponent } from './resourceMgt/add-form/add-form.component';
import { ButtonComponent } from './resourceMgt/button/button.component';
import { FirstViewComponent } from './resourceMgt/first-view/first-view.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'button', component: ButtonComponent},
  { path: 'add-form', component: AddFormComponent}
];

import { NewTeamButtonComponent } from './team-management/new-team-button/new-team-button.component';
import { TeamMainBoxComponent } from './team-management/team-main-box/team-main-box.component';
import { CreateProjectComponent } from './Project-management/create-project/create-project.component';
import { UpdateProjectComponent } from './Project-management/update-project/update-project.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { FooterComponent } from './PageBody/footer/footer.component';
import { PageHeaderComponent } from './PageBody/page-header/page-header.component';
import { SideBarComponent } from './PageBody/side-bar/side-bar.component';
import { SideBarHeaderComponent } from './PageBody/side-bar-header/side-bar-header.component';
import { CriticalLevalComponent } from './Project-management/critical-leval/critical-leval.component';
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
import { LoginAccComponent } from './login-acc/login-acc.component';
import { AdminDasbdBodyComponent } from './admin-dashboard/admin-dasbd-body/admin-dasbd-body.component';
import { DashboardHeaderComponent } from './admin-dashboard/dashboard-header/dashboard-header.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { SearchBarComponent } from './admin-dashboard/search-bar/search-bar.component';
import { CreateFormComponent } from './Sprint_Management/create-form/create-form.component';
import { SprintMgtComponent } from './Sprint_Management/sprint-mgt/sprint-mgt.component';
import { Ng2SearchPipe } from 'ng2-search-filter';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AvailableResourceListComponent } from './Sprint_Management/available-resource-list/available-resource-list.component';
import { AvailabiilityComponent } from './Sprint_Management/availabiility/availabiility.component';
import { ProjectListComponent } from './Project-management/project-list/project-list.component';
import { ListComponent } from './Sprint_Management/Reusable_Components/list/list.component';
import { ResourceDetailsComponent } from './resourceMgt/resource-details/resource-details.component';
import { ResourceEditFormComponent } from './resourceMgt/resource-edit-form/resource-edit-form.component';
import { FilterPipe } from './team-management/filter.pipe';
import { UpdateComponent } from './team-management/update/update.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TeamListComponent } from './team-management/team-list/team-list.component';
import { TeamFormComponent } from './team-management/team-form/team-form.component';
import { ResourceTableComponent } from './team-management/resource-table/resource-table.component';
import { DeletePopupComponent } from './team-management/delete-popup/delete-popup.component';
import { AddNewUserComponent } from './admin-dashboard/add-new-user/add-new-user.component';
import { FunctionManagementComponent } from './admin-dashboard/function-management/function-management.component';
import { FunctionButtonComponent } from './admin-dashboard/function-button/function-button.component';
import { UserDetailComponent } from './admin-dashboard/user-detail/user-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './spinner/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteSprintPopupComponent } from './Sprint_Management/Reusable_Components/delete-sprint-popup/delete-sprint-popup.component';
import { SearchPipe } from './resourceMgt/search.pipe';
import { UpdateResourcTableComponent } from './team-management/update-resourc-table/update-resourc-table.component';
import { ToastrModule } from 'ngx-toastr';
import { ProjectBoardComponent } from './project-dashboard/project-board/project-board.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskProjectListComponent } from './TaskManagement/task-project-list/task-project-list.component';
import { SummaryListComponent } from './project-dashboard/summary-list/summary-list.component';
import { DashbrdProjectListComponent } from './project-dashboard/dashbrd-project-list/dashbrd-project-list.component';
import { DashbrdProjectDetailsComponent } from './project-dashboard/dashbrd-project-details/dashbrd-project-details.component';
import { CalenderButtonComponent } from './calender-management/calender-button/calender-button.component';
import { CalenderMainBoxComponent } from './calender-management/calender-main-box/calender-main-box.component';
import { CalenderTypeComponent } from './calender-management/calender-type/calender-type.component';
import { GlobalCalenderComponent } from './calender-management/global-calender/global-calender.component';
import { ResourceListComponent } from './calender-management/resource-list/resource-list.component';
import { CommonCalenderComponent } from './calender-management/common-calender/common-calender.component';
import { ResourceLeaveComponent } from './calender-management/resource-leave/resource-leave.component';
import { ResourceCalenderComponent } from './calender-management/resource-calender/resource-calender.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AllocatedResourceInformationComponent } from './Sprint_Management/allocated-resource-information/allocated-resource-information.component';
import { UpdatePercentageComponent } from './Sprint_Management/update-percentage/update-percentage.component';
import { DeleteResourceAllocationComponent } from './Sprint_Management/delete-resource-allocation/delete-resource-allocation.component';
import { UpdateTaskInSprintComponent } from './Sprint_Management/update-task-in-sprint/update-task-in-sprint.component';
import { UnitDetailsComponent } from './orgUnitMgt/unit-details/unit-details.component';
import { UnitEditFormComponent } from './orgUnitMgt/unit-edit-form/unit-edit-form.component';
import { UnitFormComponent } from './orgUnitMgt/unit-form/unit-form.component';
import { UnitListComponent } from './orgUnitMgt/unit-list/unit-list.component';
import { UnitNodeComponent } from './orgUnitMgt/unit-node/unit-node.component';
import { UnitTreeComponent } from './orgUnitMgt/unit-tree/unit-tree.component';
import { EditTaskComponent } from './TaskManagement/edit-task/edit-task.component';
import { ResetPasswordComponent } from './PageBody/reset-password/reset-password.component';
import { AddJobroleComponent } from './resourceMgt/add-jobrole/add-jobrole.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WellcomeMessageComponent } from './PageBody/wellcome-message/wellcome-message.component';
import { ConfirmDialogComponent } from './ConfirmDialogBox/confirm-dialog/confirm-dialog.component';
import { EditSprintFormComponent } from './Sprint_Management/edit-sprint-form/edit-sprint-form.component';
import { SprintListComponent } from './Handle_Request/sprint-list/sprint-list.component';
import { ResponsiveTreeComponent } from './orgUnitMgt/responsive-tree/responsive-tree.component';
import { SprintDetailsComponent } from './Handle_Request/sprint-details/sprint-details.component';
import { AllocatedResourceInfoComponent } from './Handle_Request/allocated-resource-info/allocated-resource-info.component';
import { UpdateAllocationPercentageComponent } from './Handle_Request/update-allocation-percentage/update-allocation-percentage.component';
import { UpdateAllocatedTaskComponent } from './Handle_Request/update-allocated-task/update-allocated-task.component';
import { AvailableResListComponent } from './Handle_Request/available-res-list/available-res-list.component';
import { AvailabilityInfoComponent } from './Handle_Request/availability-info/availability-info.component';
import { ProjectsViewComponent } from './Project-management/projects-view/projects-view.component';
import { TaskProjectViewComponent } from './TaskManagement/task-project-view/task-project-view.component';

@NgModule({
  declarations:[
    AppComponent,
    PagesBodyComponent,
    CreateNewtaskComponent,
    ProjectDetailsComponent,
    UpdateTaskComponent,
    AddFormComponent,
    ButtonComponent,
    FirstViewComponent,
    NewTeamButtonComponent,
    TeamMainBoxComponent,
    TeamListComponent,
    TeamFormComponent,
    ResourceTableComponent,
    CreateProjectComponent,
    ProjectListComponent,
    UpdateProjectComponent,
    FooterComponent,
    PageHeaderComponent,
    SideBarComponent,
    SideBarHeaderComponent,
    CriticalLevalComponent,
    FgPsswdComponent,
    LoginAccComponent,
    AdminDasbdBodyComponent,
    DashboardHeaderComponent,
    UserListComponent,
    SearchBarComponent,
    CreateFormComponent,
    SprintMgtComponent,
    AvailableResourceListComponent,
    AvailabiilityComponent,
    // AlertBoxComponent,
    ListComponent,
    ResourceDetailsComponent,
    ResourceEditFormComponent,
    FilterPipe,
    UpdateComponent,
    DeletePopupComponent,
    AddNewUserComponent,
    FunctionManagementComponent,
    FunctionButtonComponent,
    UserDetailComponent,
    SpinnerComponent,
    DeleteSprintPopupComponent,
    SearchPipe,
    UpdateResourcTableComponent,
    ProjectBoardComponent,
    TaskProjectListComponent,
    SummaryListComponent,
    DashbrdProjectListComponent,
    DashbrdProjectDetailsComponent,
    CalenderButtonComponent,
    CalenderMainBoxComponent,
    CalenderTypeComponent,
    GlobalCalenderComponent,
    ResourceListComponent,
    CommonCalenderComponent,
    ResourceLeaveComponent,
    ResourceCalenderComponent,
    PageNotFoundComponent,
    AllocatedResourceInformationComponent,
    UpdatePercentageComponent,
    DeleteResourceAllocationComponent,
    UpdateTaskInSprintComponent,
    UnitDetailsComponent,
    UnitEditFormComponent,
    UnitFormComponent,
    UnitListComponent,
    UnitNodeComponent,
    UnitTreeComponent,
    EditTaskComponent,
    ResetPasswordComponent,
    AddJobroleComponent,
    WellcomeMessageComponent,
    ConfirmDialogComponent,
    EditSprintFormComponent,
    SprintListComponent,
    ResponsiveTreeComponent,
    SprintDetailsComponent,
    AllocatedResourceInfoComponent,
    UpdateAllocationPercentageComponent,
    UpdateAllocatedTaskComponent,
    AvailableResListComponent,
    AvailabilityInfoComponent,
    ProjectsViewComponent,
    TaskProjectViewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,//BrowserAnimationModule ws added for the spinner
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    NgbDatepickerModule,
    NgbModule,
    FormsModule,
    NgApexchartsModule,
  ],

  providers: [
    provideClientHydration(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
