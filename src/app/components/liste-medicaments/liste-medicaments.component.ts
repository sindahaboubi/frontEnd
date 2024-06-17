import { Component, OnInit } from '@angular/core';
import { Consomation } from 'src/app/model/consomation';
import { Medicament } from 'src/app/model/medicament';
import { Utilisateur } from 'src/app/model/utilisateur';
import { GererMedicamentService } from 'src/app/tasks/gerer-medicament.service';
import { GererUtilisateurService } from 'src/app/tasks/gerer-utilisateur.service';

@Component({
  selector: 'app-liste-medicaments',
  templateUrl: './liste-medicaments.component.html',
  styleUrls: ['./liste-medicaments.component.css']
})
export class ListeMedicamentsComponent implements OnInit {

  listeMed:Medicament[]=[];
  tabIdMed:number[]=[];
  util:Utilisateur;
  user:Utilisateur=new Utilisateur();
  consommations:Consomation[]=[];
    constructor(private medicamentService:GererMedicamentService,private utilisateurService:GererUtilisateurService) {
    }

  ngOnInit(): void {
    this.user.id=1;

    this.medicamentService.getAllConsommationUtil(this.user).subscribe(data=>{
      for(let i=0;i<data.length;i++){
        this.tabIdMed.push(data[i].id.idMed);
      }
      this.medicamentService.getAllMed().subscribe(meds=>{

        for(let i=0;i<meds.length;i++){
          for(let j=0;j<this.tabIdMed.length;j++){
          if(meds[i].id == this.tabIdMed[j])
          this.listeMed.push(meds[i]);
          }
        }
      })

      
    })
    console.log(this.listeMed);
  }

}
