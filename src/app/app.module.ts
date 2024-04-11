import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './pages-body/pages-body.component';
import { UnitTreeComponent } from './orgUnitMgt/unit-tree/unit-tree.component';
import { UnitListComponent } from './orgUnitMgt/unit-list/unit-list.component';
import { UnitFormComponent } from './orgUnitMgt/unit-form/unit-form.component';
import { ReuseButtonComponent } from './orgUnitMgt/reuse-button/reuse-button.component';
import { UnitNodeComponent } from './orgUnitMgt/unit-node/unit-node.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UnitDetailsComponent } from './orgUnitMgt/unit-details/unit-details.component';
import { UnitEditFormComponent } from './orgUnitMgt/unit-edit-form/unit-edit-form.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    UnitTreeComponent,
    UnitListComponent,
    UnitFormComponent,
    ReuseButtonComponent,
    UnitNodeComponent,
    UnitDetailsComponent,
    UnitEditFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
