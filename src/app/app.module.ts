import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './pages-body/pages-body.component';
import { MenuButtonComponent } from './menu-list/menu-button/menu-button.component';
import { MenulistComponent } from './menu-list/menulist/menulist.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    MenuButtonComponent,
    MenulistComponent,

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
