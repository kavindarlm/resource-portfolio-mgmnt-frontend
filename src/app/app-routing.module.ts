import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTeamButtonComponent } from './team-management/new-team-button/new-team-button.component';

const routes: Routes = [
  {path: 'NewTeamButton', component: NewTeamButtonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
