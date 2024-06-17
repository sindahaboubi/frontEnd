import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prise } from 'src/app/model/prise';
import { Ordonnance } from '../model/ordonnance';

const URL = "http://localhost:8036/prise";
@Injectable({
  providedIn: 'root'
})
export class GererPriseService {

  constructor(private http:HttpClient) { }
  public AjouterPrise(p:Prise) {
    return this.http.post<Prise>(URL+"/ajouter",p);
  }
  
  public getAllByOrd(o:Ordonnance){
    return this.http.post<Prise[]>(URL+"/getallbyords",o);
  }

  public updatePrise(p:Prise){
    return this.http.put(URL+"/update",p);
  }

  public updateAllPrise(p:Prise[]){
    return this.http.put(URL+"/updateAll",p);
  }
  public getAllPrises():Observable<Prise[]>{
    return this.http.get<Prise[]>(URL+"/all");
  }
}

