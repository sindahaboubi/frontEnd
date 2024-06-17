import { Component, OnInit } from '@angular/core';
import { Medicament } from 'src/app/model/medicament';
import { Prise } from 'src/app/model/prise';
import { Ordonnance } from 'src/app/model/ordonnance';
import { Utilisateur} from 'src/app/model/utilisateur';
import { PriseKey} from 'src/app/model/prise-key';
import { GererMedicamentService } from 'src/app/tasks/gerer-medicament.service';
import { GererOrdonnanceService } from 'src/app/tasks/gerer-ordonnance.service';
import { GererPriseService } from 'src/app/tasks/gerer-prise.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent implements OnInit {

  medicaments:Medicament[]=[];
  medicamentajoute:Medicament[]=[];
  Prises:Prise[]=[];
  medSearch:string;
  nbValidations:number=0;
  constructor(private medicamentService:GererMedicamentService,private OrdonnanceService:GererOrdonnanceService,
    private PriseService:GererPriseService) {
    
  }
  date_ins:Date;
  ngOnInit(): void {
    
    this.medicamentService.getAllMed().subscribe(meds=>
      {
        for(let i=0;i<meds.length;i++){
          this.medicaments.push(meds[i]);
        }
    });
    
    
  }
  addToPrises(prise){
    console.log("prise dans Ordonnance :"+prise);
    this.Prises.push(prise);
    console.log(this.Prises);
  }
  ajouterOrd(){
    if(this.nbValidations==this.medicamentajoute.length){
    let o:Ordonnance=new Ordonnance();
    o.idOrd=null;
    this.date_ins = new Date()
    let u:Utilisateur=new Utilisateur();
    u.id=1;
    o.utilisateur=u;
    o.piece_jointe=" ";
    o.dateInsertion = this.date_ins;
    
    this.OrdonnanceService.AjouterOrdonnance(o).subscribe(ord=>{
      for(let i=0;i<this.Prises.length;i++){  
        let pk:PriseKey=new PriseKey();
        pk.idOrd=ord.idOrd;
        pk.idMed=this.Prises[i].med.id;
        this.Prises[i].id=pk;
        this.Prises[i].ord=ord;
        this.PriseService.AjouterPrise(this.Prises[i]).subscribe();
        
      };
    });
  }else
  alert("valider tous vos medicaments !!!");
  }
  getMed(id){
    this.medicamentajoute.push(this.medicaments.find(med=>id==med.id))
    this.nbValidations++;
    for(let i=0;i<this.medicaments.length;i++){
      if(this.medicaments[i].id==id){
        this.medSearch=this.medicaments[i].nom;
        this.medicaments=this.medicaments.filter(med=>med.id!=id);
      }
    }
  }
  suppr(med:Medicament){
    this.medicamentajoute=this.medicamentajoute.filter(med=>med.id!=med.id);
    this.medicaments.push(med);
    this.nbValidations--;
  }
}