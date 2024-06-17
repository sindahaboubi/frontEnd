import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Consomation } from 'src/app/model/consomation';
import { ConsommationService } from 'src/app/tasks/consommation.service';

@Component({
  selector: 'app-list-consommations',
  templateUrl: './list-consommations.component.html',
  styleUrls: ['./list-consommations.component.css']
})
export class ListConsommationsComponent implements OnInit {

  public consommations: Consomation[] = [];

  constructor(private consommationService:ConsommationService) { }

  public getConsommations():void{
    this.consommationService.getConsommations().subscribe(
      (response:Consomation[])=>{
        this.consommations=response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  ngOnInit(): void {
    this.getConsommations();
  }

}
