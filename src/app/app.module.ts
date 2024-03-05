import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './pages-body/pages-body.component';
import { AddFormComponent } from './resourceMgt/add-form/add-form.component';
import { ButtonComponent } from './resourceMgt/button/button.component';
import { FirstViewComponent } from './resourceMgt/first-view/first-view.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    AddFormComponent,
    ButtonComponent,
    FirstViewComponent,

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
