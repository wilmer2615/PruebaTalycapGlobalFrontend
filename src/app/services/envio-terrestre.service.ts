import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvioTerrestre } from '../models/envioTerestre.model';

@Injectable({
  providedIn: 'root'
})
export class EnvioTerrestreService {

  private myAppUrl = "https://localhost:44361/";
  private myApiUrl = "api/EnvioTerrestre/";

  constructor(private http:HttpClient) { }


  getListEnviosTerrestres(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteEnvioTerrestre(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveEnvioTerrestre(envioTerrestre: EnvioTerrestre): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, envioTerrestre);
  }

  updateEnvioTerrestre(id: number, envioTerrestre: EnvioTerrestre): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, envioTerrestre);
  }
}
