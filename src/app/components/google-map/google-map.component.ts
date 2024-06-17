import { Component, OnInit, ViewChild } from '@angular/core';
import { Utilisateur } from 'src/app/model/utilisateur';
import { GererUtilisateurService } from 'src/app/tasks/gerer-utilisateur.service';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
   lati:number=1;
   lngi:number=1;
   util:Utilisateur=new Utilisateur();

    options;
    latlon;

    constructor(private utilisateurService:GererUtilisateurService) { }


    public addressChange(adresse:string) {
      let src="https://www.google.com/maps/embed/v1/search?key=AIzaSyDeI_R-h5QoKql4K8GQVxv97588Ly-Ka3M&zoom=18&q=pharmacy+in+"+adresse;
      document.getElementById("frame").setAttribute("src",src)
  }


  ngOnInit(): void {

    // ----------RECUPERER LA POSITION ACTUELLE:--------------

//     if (navigator.geolocation)
//     {
//       // si on a accès: getCurrentPosition: obtenir la position actuelle
// navigator.geolocation.getCurrentPosition((position)=>
// {
//   console.log(this.lati)
//   // obtenir la latitude
//   this.lati=position.coords.latitude;
// // obtenir la langitude
//   this.lngi=position.coords.longitude;
//   this.latlon=new google.maps.LatLng(this.lati, this.lngi);

// },this.showError);
  //   }
  //    // sinon ecrire une phrase d'erreur
  // else{
  //   console.log(" Geolocation n’est pas prise en charge par ce navigateur.");
  // }


    this.utilisateurService.getActuelleUtilisateur(1).subscribe(data => {

      this.util  = data ;
-      document.getElementById("frame").setAttribute("src","https://www.google.com/maps/embed/v1/search?key=AIzaSyDeI_R-h5QoKql4K8GQVxv97588Ly-Ka3M&zoom=15&q=pharmacy+in+"+this.util.adresse)
    });




        // --------------API PLACES BEL FLOUSS !!!!! ------------------

    // const input = document.getElementById("input") as HTMLInputElement;
    // const options = {
    //   componentRestrictions: { country: this.util.adresse },
    //   fields: ["address_components", "geometry", "icon", "name"],
    //   types: ["pharmacy"],
    // };
    
    // const autocomplete = new google.maps.places.Autocomplete(input, options);


  }
  
  showError(error)
  {
    // Gestion des erreurs
  switch(error.code)
    {
      // L'utilisateur n'a pas permis la géolocalisation
    case error.PERMISSION_DENIED:
      console.log("localisation non autorisé par l'utilisateur.")
      break;
      // Il n'est pas possible d'obtenir l'emplacement actuel
    case error.POSITION_UNAVAILABLE:
      console.log("L'information sur la localisation et indisponible.")
      break;
      // Le temps a expiré
    case error.TIMEOUT:
      console.log("le temps de réponce est dépasé.")
      break;
      // erreur inconnu
    case error.UNKNOWN_ERROR:
      console.log("Une erreur inconu a été rencontrée.")
      break;
    }
  }

}