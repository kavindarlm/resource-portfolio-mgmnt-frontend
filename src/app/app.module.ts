import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './pages-body/pages-body.component';
import { NewTeamButtonComponent } from './team-management/new-team-button/new-team-button.component';
import { TeamFormComponent } from './team-management/team-form/team-form.component';
import { TeamListComponent } from './team-management/team-list/team-list.component';
import { TeamMainBoxComponent } from './team-management/team-main-box/team-main-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResourceTableComponent } from './team-management/resource-table/resource-table.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    NewTeamButtonComponent,
    TeamFormComponent,
    TeamListComponent,
    TeamMainBoxComponent,
    ResourceTableComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
