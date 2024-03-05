import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProjectComponent } from './Project-management/create-project/create-project.component';
import { ProjectListComponent } from './Project-management/project-list/project-list.component';

const routes: Routes = [
  { path: 'ProjectList', component: ProjectListComponent },
  // { path: '', redirectTo: '/ProjectList', pathMatch: 'full' },
  {path: 'CreateProject', component: CreateProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 