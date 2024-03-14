import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddFormComponent } from './resourceMgt/add-form/add-form.component';
import { ButtonComponent } from './resourceMgt/button/button.component';
import { FirstViewComponent } from './resourceMgt/first-view/first-view.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'button', component: ButtonComponent},
  { path: 'add-form', component: AddFormComponent}
];
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { FooterComponent } from './PageBody/footer/footer.component';
import { PageHeaderComponent } from './PageBody/page-header/page-header.component';
import { SideBarComponent } from './PageBody/side-bar/side-bar.component';
import { SideBarHeaderComponent } from './PageBody/side-bar-header/side-bar-header.component';
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
import { LoginAccComponent } from './login-acc/login-acc.component'; 
import { AdminDasbdBodyComponent } from './admin-dashboard/admin-dasbd-body/admin-dasbd-body.component';
import { DashboardHeaderComponent } from './admin-dashboard/dashboard-header/dashboard-header.component';
import { UserListComponent } from './admin-dashboard/user-list/user-list.component';
import { SearchBarComponent } from './admin-dashboard/search-bar/search-bar.component';
import { ResourceDetailsComponent } from './resourceMgt/resource-details/resource-details.component';
import { ResourceEditFormComponent } from './resourceMgt/resource-edit-form/resource-edit-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    AddFormComponent,
    ButtonComponent,
    FirstViewComponent,

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
    ResourceDetailsComponent,
    ResourceEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
