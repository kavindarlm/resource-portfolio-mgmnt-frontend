import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProjectComponent } from './Project-management/create-project/create-project.component';
import { ProjectListComponent } from './Project-management/project-list/project-list.component';
import { ProjectButtunsComponent } from './Project-management/project-buttuns/project-buttuns.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateProjectComponent } from './Project-management/update-project/update-project.component';
import { FormsModule } from '@angular/forms';
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
import { AddNewUserComponent } from './admin-dashboard/add-new-user/add-new-user.component';
import { FunctionManagementComponent } from './admin-dashboard/function-management/function-management.component';
import { FunctionButtonComponent } from './admin-dashboard/function-button/function-button.component';
import { UserDetailComponent } from './admin-dashboard/user-detail/user-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './spinner/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    CreateProjectComponent,
    ProjectListComponent,
    ProjectButtunsComponent,
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
    AddNewUserComponent,
    FunctionManagementComponent,
    FunctionButtonComponent,
    UserDetailComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,//BrowserAnimationModule ws added for the spinner
  ],
  
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
