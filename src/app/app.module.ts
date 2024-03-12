import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTeamButtonComponent } from './team-management/new-team-button/new-team-button.component';
import { TeamFormComponent } from './team-management/team-form/team-form.component';
import { TeamListComponent } from './team-management/team-list/team-list.component';
import { TeamMainBoxComponent } from './team-management/team-main-box/team-main-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResourceTableComponent } from './team-management/resource-table/resource-table.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { FooterComponent } from './PageBody/footer/footer.component';
import { PageHeaderComponent } from './PageBody/page-header/page-header.component';
import { SideBarComponent } from './PageBody/side-bar/side-bar.component';
import { SideBarHeaderComponent } from './PageBody/side-bar-header/side-bar-header.component';
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
import { LoginAccComponent } from './login-acc/login-acc.component';
import { FormsModule } from '@angular/forms';
import { AdminDasbdBodyComponent } from './admin-dashboard/admin-dasbd-body/admin-dasbd-body.component';
import { DashboardHeaderComponent } from './admin-dashboard/dashboard-header/dashboard-header.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { SearchBarComponent } from './admin-dashboard/search-bar/search-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    NewTeamButtonComponent,
    TeamFormComponent,
    TeamListComponent,
    TeamMainBoxComponent,
    ResourceTableComponent,
    
    FooterComponent,
    PageHeaderComponent,
    SideBarComponent,
    SideBarHeaderComponent,

    FgPsswdComponent,
    LoginAccComponent,
    AdminDasbdBodyComponent,
    DashboardHeaderComponent,
    UserListComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
