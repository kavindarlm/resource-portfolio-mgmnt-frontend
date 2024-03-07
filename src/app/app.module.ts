import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { FooterComponent } from './PageBody/footer/footer.component';
import { PageHeaderComponent } from './PageBody/page-header/page-header.component';
import { SideBarComponent } from './PageBody/side-bar/side-bar.component';
import { SideBarHeaderComponent } from './PageBody/side-bar-header/side-bar-header.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    FooterComponent,
    PageHeaderComponent,
    SideBarComponent,
    SideBarHeaderComponent,

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
