import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './pages-body/pages-body.component';
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
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
