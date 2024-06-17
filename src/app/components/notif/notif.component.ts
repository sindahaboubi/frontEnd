import { Component, OnInit } from '@angular/core';
import { GererMedicamentService } from 'src/app/tasks/gerer-medicament.service';
import { GererOrdonnanceService } from 'src/app/tasks/gerer-ordonnance.service';
import { GererPriseService } from 'src/app/tasks/gerer-prise.service';
import { ConsommationService } from 'src/app/tasks/consommation.service';
import { Prise } from 'src/app/model/prise';
import { Utilisateur } from 'src/app/model/utilisateur';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medicament } from 'src/app/model/medicament';
import { Id } from 'src/app/model/id';
@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css']
})
export class NotifComponent implements OnInit {
  utilisateur: Utilisateur = new Utilisateur(); //Utilisateur actuel
  constructor(private medicamentService: GererMedicamentService, private OrdonnanceService: GererOrdonnanceService,
    private PriseService: GererPriseService, private ConsommationService: ConsommationService, private _snackBar: MatSnackBar) { }
  prisefiltrer: Prise[] = [];
  prises: Prise[] = [];
  ngOnInit(): void {
    this.utilisateur.id = 1;
    let d: Date = new Date();
    let time = localStorage.getItem("time");
    let date= new Date(localStorage.getItem("date"));
    
    //Test pour la date
    if(date<d){
      localStorage.setItem("date",d.toDateString())
      if (d.getHours() >=0 && d.getHours() < 12) {
        localStorage.setItem("time", "matin")
      }
      else if (d.getHours() < 20) {
        localStorage.setItem("time", "midi")
      }
      else localStorage.setItem("time", "soir");
    }

    //Test pour la période (Dans la même date)
    if ((d.getHours() > 4 && d.getHours() < 12 && time == "soir")) {
      localStorage.setItem("time","matin");
    }
    else if((d.getHours() >= 12 && d.getHours() < 20 && time == "matin")){
      localStorage.setItem("time","midi")
    }
    else if((d.getHours() >= 20 && time == "midi")) {localStorage.setItem("time","soir")}

    //get ordonnances by utilisateur 1
    this.OrdonnanceService.getUtilisateurOrd(this.utilisateur).subscribe(ords => {
      //get all prises by ordonnance
      for (let i = 0; i < ords.length; i++) {
        this.PriseService.getAllByOrd(ords[i]).subscribe(prise => {
          let val = "";
          this.prises = prise;
          //Mettre à jour les prises 
          if ((d.getHours() > 4 && d.getHours() < 12 && time == "matin") || (d.getHours() >= 12 && d.getHours() < 20 && time == "midi") || (d.getHours() >= 20 && time == "soir")) {
            this.majPrise(this.prises);
          }
          //Filtrage des prises (temps,date,pris)
          this.prisefiltrer = prise.filter(p => p.pris == false);
          this.prisefiltrer = this.prisefiltrer.filter(p => new Date(p.datefinprise) > d && new Date(p.dateprise) < d);
          if (d.getHours() > 5 && d.getHours() < 12) {
            this.prisefiltrer = this.prisefiltrer.filter(p => p.prisejour > 0);
            val = "jour";
          }
          else if (d.getHours() < 20) {
            this.prisefiltrer = this.prisefiltrer.filter(p => p.prisemidi > 0);
            val = "midi";
          }
          else {
            this.prisefiltrer = this.prisefiltrer.filter(p => p.prisesoir > 0);
            val = "soir";
          }
          //this.openSnackBar(this.prisefiltrer, val);
          
        })
      }
    })
    if (localStorage.getItem("time") == null) {
      localStorage.setItem("date",new Date(d.setDate(d.getDate()+1)).toDateString());
      if (d.getHours() > 4 && d.getHours() < 12) {
        localStorage.setItem("time", "matin")
      }
      else if (d.getHours() < 20) {
        localStorage.setItem("time", "midi")
      }
      else localStorage.setItem("time", "soir");
    }
    
    if ((d.getHours() > 4 && d.getHours() < 12 && time == "matin") || (d.getHours() >= 12 && d.getHours() < 20 && time == "midi") || (d.getHours() >= 20 && time == "soir")) {
      switch (time) {
        case "matin":
          localStorage.setItem("time", "midi")
          break;
        case "midi":
          localStorage.setItem("time", "soir")
          break;
        case "soir":
          localStorage.setItem("time", "matin")
          localStorage.setItem("date",new Date(d.setDate(d.getDate()+1)).toDateString())
          break;
      }
    }
  }
  majPrise(prise: Prise[]) {
    for (let i = 0; i < prise.length; i++) {
      prise[i].pris = false;
    }
    this.PriseService.updateAllPrise(prise).subscribe(data => console.log(data));
  }
  openSnackBar(prise: Prise[], val: string) {
    for (let i = 0; i < prise.length; i++) {
      let message = "";
      this.medicamentService.getMedicamentsById(prise[i].id.idMed).subscribe(data => {
        switch (val) {
          case "jour":
            message = "Vous devez prendre " + prise[i].prisejour + " " + data.unite.valeur + " de " + data.nom;
            break;
          case "midi":
            message = "Vous devez prendre " + prise[i].prisemidi + " " + data.unite.valeur + " de " + data.nom;
            break;
          case "soir":
            message = "Vous devez prendre " + prise[i].prisesoir + " " + data.unite.valeur + " de " + data.nom;
        }

        let snack = this._snackBar.open(message, "J'ai pris mon médicament", {
          horizontalPosition: "end", verticalPosition: "bottom",
          duration: 10 * 1000
        });
        snack.onAction().subscribe(() => {
          let id: Id = new Id();
          id.idMed = prise[i].med.id;
          id.idUtil = 1;
          this.ConsommationService.getConsommationById(id).subscribe(data => {
            switch (val) {
              case "jour":
                data.qte_stock = data.qte_stock - prise[i].prisejour;
                break;
              case "midi":
                data.qte_stock = data.qte_stock - prise[i].prisemidi
                break;
              case "soir":
                data.qte_stock = data.qte_stock - prise[i].prisesoir;
            }
            this.ConsommationService.updateStockById(data).subscribe()
            prise[i].pris = true;
            this.PriseService.updatePrise(prise[i]).subscribe()
            window.location.reload();
          })
        })
      })
    }
  }
}
