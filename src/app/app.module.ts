import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './pages-body/pages-body.component';
import { CreateNewtaskComponent } from './TaskManagement/create-newtask/create-newtask.component';
import { ProjectDetailsComponent } from './TaskManagement/project-details/project-details.component';
import { UpdateTaskComponent } from './TaskManagement/update-task/update-task.component';
import { ButtonTusksComponent } from './TaskManagement/button-tusks/button-tusks.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    CreateNewtaskComponent,
    ProjectDetailsComponent,
    UpdateTaskComponent,
    ButtonTusksComponent,

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
