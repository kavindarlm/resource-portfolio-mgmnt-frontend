import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateNewtaskComponent } from './TaskManagement/create-newtask/create-newtask.component';
import { ProjectDetailsComponent } from './TaskManagement/project-details/project-details.component';
import { UpdateTaskComponent } from './TaskManagement/update-task/update-task.component';
import { ButtonTusksComponent } from './TaskManagement/button-tusks/button-tusks.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { FooterComponent } from './PageBody/footer/footer.component';
import { PageHeaderComponent } from './PageBody/page-header/page-header.component';
import { SideBarComponent } from './PageBody/side-bar/side-bar.component';
import { SideBarHeaderComponent } from './PageBody/side-bar-header/side-bar-header.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    CreateNewtaskComponent,
    ProjectDetailsComponent,
    UpdateTaskComponent,
    ButtonTusksComponent,
    FooterComponent,
    PageHeaderComponent,
    SideBarComponent,
    SideBarHeaderComponent,

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
