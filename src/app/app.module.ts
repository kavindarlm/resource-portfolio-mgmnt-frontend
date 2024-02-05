import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesBodyComponent } from './pages-body/pages-body.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
import { LoginComponent } from './login/login.component';
import { LoginAccComponent } from './login-acc/login-acc.component';


@NgModule({
  declarations: [
    AppComponent,
    PagesBodyComponent,
    ForgotPasswordComponent,
    FgPsswdComponent,
    LoginComponent,
    LoginAccComponent,
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
