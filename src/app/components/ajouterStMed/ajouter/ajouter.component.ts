import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { Consomation } from 'src/app/model/consomation';
import { Id } from 'src/app/model/id';
import { Medicament } from 'src/app/model/medicament';
import { Utilisateur } from 'src/app/model/utilisateur';
import { GererMedicamentService } from 'src/app/tasks/gerer-medicament.service';
import { GererUtilisateurService } from 'src/app/tasks/gerer-utilisateur.service';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit {

  medics:Medicament[];
  mediForm:FormGroup;
  qte_stock:number=0;
  
  constructor(private medService:GererMedicamentService,
              private utilService:GererUtilisateurService,
              private formBuilder:FormBuilder
              ) 
              { }
  meds:MatSelectionList
  medics_cocher : Medicament[] =[];
  consomation:Consomation[]=[];
  consomations:Consomation[]=[];
  util:Utilisateur;
  ngOnInit(): void {
    
    this.medService.getAllMed().subscribe(data => {
      this.medics = data;
      
      this.mediForm=this.formBuilder.group({
        qte_stock:[]
      })

    })

    this.utilService.getActuelleUtilisateur(1).subscribe(data => {

      this.util  = data ;
      if(this.util != null){
      this.medService.getAllConsommationUtil(this.util).subscribe(cons => {
        this.consomations = cons
        
        
      })}else{
        console.log("vide");
        
      }

  });
    
  }
  verifCoche(i:number){
    if(this.medics_cocher.length !=0){
      if(this.medics_cocher?.find(med => med.id==this.medics[i].id) != undefined){
        return true;
      }
    }
    return false;
  }
  med:Medicament;
  consm:Consomation=new Consomation();
  transfererMedic(id:number,i:number){

    if(this.medics_cocher?.find(med => med.id==id) == undefined){ 
       this.med=this.medics.find(med=> med.id==id);
       this.medics_cocher.push(this.med);
       this.consomation.push(new Consomation());
       console.log(this.consomation);
       if(this.consomation.length==1)
       this.consomation[0].med=this.med;
       else
       this.consomation[this.consomation.length-1].med=this.med;

       this.consomation[this.consomation.length-1].qte_stock = 1;   
       console.log(this.consomation);
      }else{
        console.log(id);
        this.consm=this.consomation.find(c=>c.med.id==id);
        this.consm.qte_stock=this.consm.qte_stock+1;
      }    
    }

    annulerMedicamentStq(i:number,id:number){     
      this.consm=this.consomation.find(c=>c.med.id==id);
      var pos;
      for(let x=0;x<this.consomation.length;x++){
        if(this.consm==this.consomation[x])
           pos=x;
      }
      if(this.consm.qte_stock > 0 ){
          this.consm.qte_stock=this.consm.qte_stock-1;
      }else{
        this.consomation.splice(pos,1);
        this.medics_cocher.splice(pos,1)
      }
    }
  

  confirmerAjoutMed(){
    console.log(this.consomations);

    if(confirm("vous etes sur que vous voulez ajouter ce medicament a votre boite de pharmacie Mr "+this.util.nom)){
    for(let i=0;i<this.medics_cocher.length;i++){
      if(this.consomations.find(cons =>cons.id == this.consomation[i].id) == undefined){
        console.log(this.consomations.find(cons =>cons.id == this.consomation[i].id) == undefined);
        
      for(let j=0;j<this.medics_cocher.length;j++){
      this.consomation[i].med = this.medics_cocher[j];
      this.consomation[i].pat = this.util;
      this.consomation[i].id = new Id(this.medics_cocher[j].id,this.util.id)
    
      if(this.consomations.find(cons =>cons.id.idMed == this.consomation[i].id.idMed) == undefined){
      this.medService.ajouterLeConsomateur(this.consomation[i]).subscribe(data=>{
        console.log(data);
      })
      alert("okkk")
    }
      else{
        alert("vous avez deja ses medicament dans la boite")
        }
    }

      this.medics_cocher=[];
      this.consomation=[];
    }  

  }
}
  }
}
