import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consomation } from '../model/consomation';
import { Medicament } from '../model/medicament';
import { Utilisateur } from '../model/utilisateur';


const URL1 = "http://localhost:8036/medicament";
const URL2 = "http://localhost:8036/consommation";

@Injectable({
  providedIn: 'root'
})
export class GererMedicamentService {

  constructor(private http:HttpClient) { }

  public getAllMed():Observable<Medicament[]>{
    return this.http.get<Medicament[]>(URL1+"/getall");
  }
  public getMedicamentsById(id:number):Observable<Medicament>{
    return this.http.post<Medicament>(URL1+"/getmedbyid",id);
  }
  public ajoutMedicNet(med:Medicament){
    return this.http.post<Medicament>(URL1+"/addmedic",med);
  }

  public ajouterLeConsomateur(c:Consomation){
     return this.http.post<Consomation>(URL2+"/addconsom",c);
  }

  public getAllConsommation(user:Utilisateur):Observable<Consomation[]>{
    return this.http.get<Consomation[]>(URL2+"/getall");
  }

  public getAllConsommationUtil(u:Utilisateur){
    return this.http.post<Consomation[]>(URL2+"/getallbypat",u)
  }
}
