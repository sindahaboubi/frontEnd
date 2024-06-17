import { Component, OnInit } from '@angular/core';
import { Ordonnance } from 'src/app/model/ordonnance';
import { Prise } from 'src/app/model/prise';
import { Utilisateur } from 'src/app/model/utilisateur';
import { GererOrdonnanceService } from 'src/app/tasks/gerer-ordonnance.service';
import { GererPriseService } from 'src/app/tasks/gerer-prise.service';
import { GererUtilisateurService } from 'src/app/tasks/gerer-utilisateur.service';

@Component({
  selector: 'app-list-ordonnance',
  templateUrl: './list-ordonnance.component.html',
  styleUrls: ['./list-ordonnance.component.css']
})
export class ListOrdonnanceComponent implements OnInit {

  constructor(private gererOrd:GererOrdonnanceService,private gererUtil:GererUtilisateurService,
    private gererPrise:GererPriseService) { }
  util_actuelle:Utilisateur;
  ord:Ordonnance[];
  ordonnanceInac:Ordonnance;
  ordonnancesInac:Ordonnance[]=[];
  prises:Prise[]=[];
  priseFiltres:Prise;
  prisesFinie:Prise[]=[];
  verif:boolean;

  ngOnInit(): void {

    this.gererUtil.getActuelleUtilisateur(1).subscribe(util_data =>{
      this.util_actuelle = util_data;
      this.gererOrd.getUtilisateurOrd(this.util_actuelle).subscribe(ord_data =>{
        console.log(ord_data);
        this.ord = ord_data;
      })
    });
  }

  public SupprimerOrd(i:number){
      if(confirm("Mr "+this.ord[i].utilisateur.nom+" vous etes sur de supprimer cette ordonnance")){
        this.gererOrd.supprimerOrd(this.ord[i].idOrd).subscribe(data => this.ord.splice(i,1))
      }
  }
  
  dsys : Date = new Date();

  //tjib les prises mta3 ordonnance mou3ayna (bl ID)
  public getAllByOr(o:Ordonnance){
    this.gererPrise.getAllByOrd(o).subscribe(prise =>{

      this.prises = prise;
      this.prises.sort((a, b) => new Date(a.datefinprise).getTime() - new Date(b.datefinprise).getTime());

      this.priseFiltres = this.prises[this.prises.length - 1];

      if(new Date(this.priseFiltres.datefinprise).getTime() < this.dsys.getTime()){
        this.prisesFinie=this.prises;
        this.ord=[];
        this.verif = true;
        console.log(o.idOrd,' Date passée ? ',this.verif);
        this.getOrdById(o.idOrd);
      }
      else{
        this.verif = false;
        console.log(o.idOrd,' Date passée ? ',this.verif);
        this.getOrdById(o.idOrd);
      }
    })
  }

  public getOrdInactive(){
    for(let i=0; i< this.ord.length; i++){
      console.log("Ordonnance d'ID = ",this.ord[i].idOrd," : ");
      this.getAllByOr(this.ord[i]);
    }
  }

  public getOrdById(id:number){
    this.gererOrd.getOrdById(id)
    .subscribe(data => {
      console.log(data)
      this.ordonnanceInac = data;
      this.ordonnancesInac.push(this.ordonnanceInac);
    }, error => console.log(error));

    console.log(this.ordonnancesInac);
}



}
