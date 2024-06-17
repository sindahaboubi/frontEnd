import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterComponent } from './components/ajouterStMed/ajouter/ajouter.component';
import { ErrorComponent } from './components/error/error.component';
import { ListeMedicamentsComponent } from './components/liste-medicaments/liste-medicaments.component';
import { OrdonnanceComponent } from './components/ordonnance/ordonnance.component';
import { DetailsConsommationsComponent } from './components/details-consommations/details-consommations.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';
import { ListOrdonnanceComponent } from './components/list-ordonnance/list-ordonnance.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  {path:'accueil',component: HomeComponent},
  {path:'ajouter',component: AjouterComponent},
  {path:'pharmacies',component: GoogleMapComponent},
  {path:'medicaments/:idM',component:DetailsConsommationsComponent},
  {path:'medicaments',component: ListeMedicamentsComponent},
  {path:'ordonnance',component: OrdonnanceComponent},
  {path:'listOrd',component: ListOrdonnanceComponent},
  // {path:'listeConsommations/details/:idM/:idU', component:DetailsConsommationsComponent},
  {path:'', redirectTo: 'medicaments', pathMatch: "full"},
  {path:"**" , component:ErrorComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
