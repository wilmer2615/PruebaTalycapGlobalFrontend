import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvioMaritimo } from '../models/envioMaritimo.model';

@Injectable({
  providedIn: 'root'
})
export class EnvioMaritimoService {

  private myAppUrl = "https://localhost:44361/";
  private myApiUrl = "api/EnvioMaritimo/";

  constructor(private http:HttpClient) { }


  getListEnviosMaritimos(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteEnvioMaritimo(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveEnvioMaritimo(envioMaritimo: EnvioMaritimo): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, envioMaritimo);
  }

  updateEnvioMaritmo(id: number, envioMaritimo: EnvioMaritimo): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, envioMaritimo);
  }
}
