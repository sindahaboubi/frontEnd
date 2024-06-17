import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consomation } from '../model/consomation';
import { Id } from '../model/id';

const URL1 = "http://localhost:8036/consommation";
@Injectable({
  providedIn: 'root'
})


export class ConsommationService {

  private apiServerUrl= environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  public getConsommations():Observable<Consomation[]>{
    return this.http.get<Consomation[]>(`${this.apiServerUrl}/consommation/all`);
  }

  public updateStockById(conso:Consomation):Observable<Consomation>{
    return this.http.put(URL1+"/modifier",conso);
  }
  public getConsommationById(i:Id){
    return this.http.post<Consomation>(URL1+"/getbyid",i);
  }
}
