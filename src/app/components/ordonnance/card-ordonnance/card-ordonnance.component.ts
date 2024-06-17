import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Medicament } from 'src/app/model/medicament';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Prise } from 'src/app/model/prise';
@Component({
  selector: 'app-card-ordonnance',
  templateUrl: './card-ordonnance.component.html',
  styleUrls: ['./card-ordonnance.component.css']
})
export class CardOrdonnanceComponent implements OnInit {
  @Input() medicament:Medicament;
  @Output() priseEvent=new EventEmitter();
  PriseForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.PriseForm = this.fb.group(
      {
        dateDebutPrise:[,Validators.required],
        dateFinPrise:[,Validators.required],
        prisejour:[,Validators.required],
        prisemidi:[,Validators.required],
        prisesoir:[,Validators.required]
      }
      )
      
  }
  callParent(){
    let div=document.getElementsByClassName("btn_valid");
    div[div.length-1].setAttribute("style","display:none");
    let span=document.getElementsByTagName("span");
    span[span.length-1].style.display="block";
    console.log(this.PriseForm.invalid)
    let p:Prise=new Prise();
    p.med=this.medicament;
    p.dateprise=this.PriseForm.controls['dateDebutPrise'].value;
    p.datefinprise=this.PriseForm.controls['dateFinPrise'].value;
    p.prisejour=this.PriseForm.controls['prisejour'].value;
    p.prisemidi=this.PriseForm.controls['prisemidi'].value;
    p.prisesoir=this.PriseForm.controls['prisesoir'].value;
    this.priseEvent.emit(p);
  }

}
