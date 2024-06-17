import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {MatListModule} from '@angular/material/list';
import { AppComponent } from './app.component';
import { AjouterComponent } from './components/ajouterStMed/ajouter/ajouter.component';
import { AjouterPanelComponent } from './components/ajouterStMed/ajouter-panel/ajouter-panel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AjouterCardComponent } from './components/ajouterStMed/ajouter-card/ajouter-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeMedicamentsComponent } from './components/liste-medicaments/liste-medicaments.component';
import { ErrorComponent } from './components/error/error.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { OrdonnanceComponent } from './components/ordonnance/ordonnance.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardOrdonnanceComponent } from './components/ordonnance/card-ordonnance/card-ordonnance.component';
import { HomeComponent } from './components/home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MedicamentFilter } from './components/ordonnance/medicament-filter.pipe';
import { DetailsConsommationsComponent } from './components/details-consommations/details-consommations.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { MenuUserComponent } from './components/menu-user/menu-user.component';
// import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './components/google-map/google-map.component';

import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { NotifComponent } from './components/notif/notif.component';
import { ListOrdonnanceComponent } from './components/list-ordonnance/list-ordonnance.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxImageZoomModule } from 'ngx-image-zoom';


@NgModule({
  declarations: [
    AppComponent,
    AjouterComponent,
    AjouterPanelComponent,
    AjouterCardComponent,
    ListeMedicamentsComponent,
    ErrorComponent,
    OrdonnanceComponent,
    NavbarComponent,
    CardOrdonnanceComponent,
    HomeComponent ,
    MedicamentFilter,
    DetailsConsommationsComponent,
    NavbarUserComponent,
    MenuUserComponent,
    GoogleMapComponent,
    NotifComponent,
    ListOrdonnanceComponent
  ],
  imports: [
    // Ng2SearchPipeModule,
    // GoogleMapsModule,
    GooglePlaceModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatSliderModule,
    MatIconModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    NgxImageZoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
