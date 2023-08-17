import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Puerto } from '../models/puerto.model';

@Injectable({
  providedIn: 'root'
})
export class PuertoService {

  private myAppUrl = "https://localhost:44361/";
  private myApiUrl = "api/Puerto/";

  constructor(private http:HttpClient) { }


  getListPuertos(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deletePuerto(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  savePuerto(puerto: Puerto): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, puerto);
  }

  updatePuerto(id: number, puerto: Puerto): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, puerto);
  }
}
