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
import { LayOutComponent } from './Project-management/lay-out/lay-out.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { FooterComponent } from './PageBody/footer/footer.component';
import { PageHeaderComponent } from './PageBody/page-header/page-header.component';
import { SideBarComponent } from './PageBody/side-bar/side-bar.component';
import { SideBarHeaderComponent } from './PageBody/side-bar-header/side-bar-header.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    CreateProjectComponent,
    ProjectListComponent,
    ProjectButtunsComponent,
    UpdateProjectComponent,
    LayOutComponent,
    FooterComponent,
    PageHeaderComponent,
    SideBarComponent,
    SideBarHeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
    AppRoutingModule
  ], 
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
