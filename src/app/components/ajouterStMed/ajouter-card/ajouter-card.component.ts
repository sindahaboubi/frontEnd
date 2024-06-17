import { Component, Input, OnInit } from '@angular/core';
import { Medicament } from 'src/app/model/medicament';

@Component({
  selector: 'app-ajouter-card',
  templateUrl: './ajouter-card.component.html',
  styleUrls: ['./ajouter-card.component.css']
})
export class AjouterCardComponent implements OnInit {

  @Input()med:Medicament;
  constructor() { }

  ngOnInit(): void {
  }

}
