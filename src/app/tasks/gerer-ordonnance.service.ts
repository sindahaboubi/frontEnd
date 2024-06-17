import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordonnance } from 'src/app/model/ordonnance';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../model/utilisateur';

const URL = "http://localhost:8036/ordonnance";
@Injectable({
  providedIn: 'root'
})

export class GererOrdonnanceService {
  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  /**
   * AjouterOrdonnance
   */
  public AjouterOrdonnance(o:Ordonnance) {
    return this.http.post<Ordonnance>(URL+"/addOrd",o);
  }
  public getUtilisateurOrd(u:Utilisateur) {
     return this.http.post<Ordonnance[]>(URL+"/get/UtilOrd",u);
  }

  public supprimerOrd(id:number){
    return this.http.delete(URL+"/kill/ord/"+id)
  }

getOrdById(id: number): Observable<Ordonnance> {
    return this.http.get<Ordonnance>(`${this.apiServerUrl}/all/${id}`);
  }

  
}
