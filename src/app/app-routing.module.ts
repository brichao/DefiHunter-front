import { MesDefisComponent } from './mes-defis/mes-defis.component';
import { MonProfilComponent } from './mon-profil/mon-profil.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ChamisTableauComponent } from './chamis-tableau/chamis-tableau.component';
import { DefisTableauComponent } from './defis-tableau/defis-tableau.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'inscription', component: RegisterFormComponent },
  { path: 'chamis', component: ChamisTableauComponent },
  { path: 'defis',  component: DefisTableauComponent },
  { path: 'profil',  component: MonProfilComponent },
  { path: 'defi',  component: MesDefisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
