import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consomation } from 'src/app/model/consomation';
import { Medicament } from 'src/app/model/medicament';
import { Utilisateur } from 'src/app/model/utilisateur';
import { ConsommationService } from 'src/app/tasks/consommation.service';
import { GererMedicamentService } from 'src/app/tasks/gerer-medicament.service';
import { GererUtilisateurService } from 'src/app/tasks/gerer-utilisateur.service';

@Component({
  selector: 'app-details-consommations',
  templateUrl: './details-consommations.component.html',
  styleUrls: ['./details-consommations.component.css']
})
export class DetailsConsommationsComponent implements OnInit {

  idM!: number;

  consommation:Consomation=new Consomation();
  utilisateur:Utilisateur=new Utilisateur();
  med:Medicament=new Medicament();
  constructor(private medicamentService:GererMedicamentService,private route: ActivatedRoute, private consommationService:ConsommationService, private utilService:GererUtilisateurService) { }

  ngOnInit(): void {
    this.idM = this.route.snapshot.params['idM'];

    // this.medicamentService.getMedicamentsById(this.idM).subscribe(data=>this.med=data)

    this.utilService.getActuelleUtilisateur(1).subscribe(user=>{
      this.utilisateur=user;
    this.medicamentService.getAllConsommationUtil(this.utilisateur).subscribe(data=>{ 
      this.medicamentService.getAllMed().subscribe(meds=>{
        for(let j=0;j<data.length;j++){
          for(let i=0;i<meds.length;i++){
              if(meds[i].id ==data[j].id.idMed)
                this.consommation=data[j]; 
              }
            }
      });
      })
      console.log(this.consommation);
    });
  }

  public updateStockById():void{
    this.consommationService.updateStockById(this.consommation)
    .subscribe(data=>{
      if(data==null)
      alert('Le stock de votre médicament '+this.consommation.med.nom+' n\'est pas modifié');
      else
      alert('Le stock de votre médicament '+this.consommation.med.nom+' est modifié');

    });
      }

}
