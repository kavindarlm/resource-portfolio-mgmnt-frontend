import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAccComponent } from './login-acc/login-acc.component';
import { FgPsswdComponent } from './fg-psswd/fg-psswd.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import { AdminDasbdBodyComponent } from './admin-dashboard/admin-dasbd-body/admin-dasbd-body.component';
import { AddFormComponent } from './resourceMgt/add-form/add-form.component';
import { FirstViewComponent } from './resourceMgt/first-view/first-view.component';
import { ButtonComponent } from './resourceMgt/button/button.component';
import { ResourceDetailsComponent } from './resourceMgt/resource-details/resource-details.component';
import { ResourceEditFormComponent } from './resourceMgt/resource-edit-form/resource-edit-form.component';

const routes: Routes = [
  //redirect to login page
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'login', component: LoginAccComponent },
  // { path: 'forgot-password', component: FgPsswdComponent },
  // { path: 'pages-body', component: PagesBodyComponent },
  // { path: 'admin-dashboard', component: AdminDasbdBodyComponent}

  {
    path: '', component: PagesBodyComponent,

    children: [
      {
        path: 'first-view', component: FirstViewComponent,
        children: [
          { path: 'button', component: ButtonComponent },
          { path: 'add-form', component: AddFormComponent },
          {
            path: 'resource-details', component: ResourceDetailsComponent,
            children: [
              { path: 'resouce-edit-form', component: ResourceEditFormComponent }
            ]
          }
        ]
      }
    ]
  }

  //wildcard route to handle 404
  //{ path: '**', component: PageNotFoundComponent } // PageNotFoundComponent needs to be created
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
