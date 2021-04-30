import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list'
import {MatTableModule} from '@angular/material/table';
import { YagaModule } from '@yaga/leaflet-ng2';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ChamisTableauComponent } from './chamis-tableau/chamis-tableau.component';
import { DefisTableauComponent } from './defis-tableau/defis-tableau.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterFormService } from './services/register-form.service';
import { ChamisService } from './services/chamis.service';
import { PseudoValidators } from './register-form/pseudo.validators';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChamisTableauComponent,
    DefisTableauComponent,
    HeaderComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    YagaModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'inscription',
        component: RegisterFormComponent
      },
      {
        path: 'chamis',
        component: ChamisTableauComponent
      },
      {
        path: 'defis',
        component: DefisTableauComponent
      },
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [
    RegisterFormService,
    ChamisService,
    PseudoValidators
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
