import { RegisterFormComponent } from './register-form/register-form.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ChamisTableauComponent } from './chamis-tableau/chamis-tableau.component';
import { DefisTableauComponent } from './defis-tableau/defis-tableau.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : 'defis', component : DefisTableauComponent},
  { path : 'chamis', component : ChamisTableauComponent},
  { path : 'register', component : RegisterFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
