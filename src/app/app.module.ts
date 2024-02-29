import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './pages-body/pages-body.component';
import { CreateFormComponent } from './Sprint_Management/create-form/create-form.component';
import { SprintMgtComponent } from './Sprint_Management/sprint-mgt/sprint-mgt.component';

import { Ng2SearchPipe } from 'ng2-search-filter';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './Sprint_Management/filter.pipe';
import { TablesComponent } from './Sprint_Management/Reusable_components/tables/tables.component';
import { FilterComponent } from './Sprint_Management/Reusable_components/filter/filter.component';
import { AvailableResourceListComponent } from './Sprint_Management/available-resource-list/available-resource-list.component';
import { AvailabiilityComponent } from './Sprint_Management/availabiility/availabiility.component';
import { AlertBoxComponent } from './Sprint_Management/Reusable_Components/alert-box/alert-box.component';
import { AddedResourceListComponent } from './Sprint_Management/added-resource-list/added-resource-list.component';




@NgModule({
  declarations:[
    AppComponent,
    PagesBodyComponent,
    CreateFormComponent,
    SprintMgtComponent,

    FilterPipe,
    TablesComponent,
    FilterComponent,
    AvailableResourceListComponent,
    AvailabiilityComponent,
    AddedResourceListComponent,
    // AddedResourceListComponent,
    // AlertBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
