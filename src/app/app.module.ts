import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { CreateFormComponent } from './Sprint_Management/create-form/create-form.component';
import { SprintMgtComponent } from './Sprint_Management/sprint-mgt/sprint-mgt.component';

import { Ng2SearchPipe } from 'ng2-search-filter';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './Sprint_Management/filter.pipe';
import { FilterComponent } from './Sprint_Management/Reusable_Components/filter/filter.component';
import { AvailableResourceListComponent } from './Sprint_Management/available-resource-list/available-resource-list.component';
import { AvailabiilityComponent } from './Sprint_Management/availabiility/availabiility.component';
import { AddedResourceListComponent } from './Sprint_Management/added-resource-list/added-resource-list.component';


import { ProjectListComponent } from './Project-management/project-list/project-list.component';
import { ProjectButtunsComponent } from './Project-management/project-buttuns/project-buttuns.component';
import { ListComponent } from './Sprint_Management/Reusable_Components/list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { TablesComponent } from './Sprint_Management/Reusable_Components/tables/tables.component';



@NgModule({
  declarations:[
    AppComponent,
    PagesBodyComponent,
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
    CreateFormComponent,
    SprintMgtComponent,


    FilterPipe,
    FilterComponent,
    AvailableResourceListComponent,
    AvailabiilityComponent,

    AddedResourceListComponent,
    // AlertBoxComponent,

    ProjectButtunsComponent,
    ProjectListComponent,

    
    ListComponent,

    TablesComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
  
    

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
