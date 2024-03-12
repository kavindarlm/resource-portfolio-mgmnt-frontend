import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './Project-management/create-project/create-project.component';
import { ProjectListComponent } from './Project-management/project-list/project-list.component';
import { UpdateProjectComponent } from './Project-management/update-project/update-project.component';
import { PagesBodyComponent } from './PageBody/pages-body/pages-body.component';
import path from 'node:path';

const routes: Routes = [
  { path: '', component: PagesBodyComponent,
    children:[
      {path: 'projectlist', component: ProjectListComponent,
      children:[
        {path: 'createproject', component: CreateProjectComponent}, 
        {path: 'updatePoject/:id', component: UpdateProjectComponent}
      ]},
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]       
})
export class AppRoutingModule {}
 