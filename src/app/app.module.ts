import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './pages-body/pages-body.component';
import { UnitTreeComponent } from './orgUnitMgt/unit-tree/unit-tree.component';
import { UnitListComponent } from './orgUnitMgt/unit-list/unit-list.component';
import { UnitFormComponent } from './orgUnitMgt/unit-form/unit-form.component';
import { ReuseButtonComponent } from './orgUnitMgt/reuse-button/reuse-button.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    UnitTreeComponent,
    UnitListComponent,
    UnitFormComponent,
    ReuseButtonComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
