import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from '../model/utilisateur';


const URL2 = "http://localhost:8036/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class GererUtilisateurService {

  constructor(private http:HttpClient) { }

  public getActuelleUtilisateur(id:number):Observable<Utilisateur>{

    return this.http.get<Utilisateur>(URL2+"/actuelleutil/"+id);
  }

}
