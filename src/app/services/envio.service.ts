import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  private myAppUrl = "https://localhost:44361/";
  private myApiUrl = "api/Envio/";

  constructor(private http:HttpClient) { }


  getListEnvios(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteEnvio(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveEnvio(envio: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, envio);
  }

  updateEnvio(id: number, envio: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, envio);
  }
}
