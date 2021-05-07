import { DefisService } from './services/defis.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list'
import {MatGridListModule} from '@angular/material/grid-list'
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
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
import { AccueilComponent } from './accueil/accueil.component';
import { AjoutDefiComponent } from './defis-tableau/ajout-defi/ajout-defi.component';
import { ModifierDefisComponent } from './defis-tableau/modifier-defis/modifier-defis.component';
import { CommonModule } from "@angular/common";
import { ModifierChamisComponent } from './chamis-tableau/modifier-chamis/modifier-chamis.component';
import { ArretsService } from './services/arrets.service';
import { ArretsComponent } from './arrets/arrets.component';
import { SelectionDefiComponent } from './accueil/selection-defi/selection-defi.component';
import { QuestionsComponent } from './questions/questions.component';
import { PointsVisiteComponent } from './accueil/selection-defi/points-visite/points-visite.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ChamisTableauComponent,
    DefisTableauComponent,
    HeaderComponent,
    RegisterFormComponent,
    AjoutDefiComponent,
    ModifierDefisComponent,
    ModifierChamisComponent,
    ArretsComponent,
    SelectionDefiComponent,
    QuestionsComponent,
    PointsVisiteComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    YagaModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    RegisterFormService,
    ChamisService,
    DefisService,
    ArretsService,
    PseudoValidators
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
