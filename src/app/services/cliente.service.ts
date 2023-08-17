import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private myAppUrl = "https://localhost:44361/";
  private myApiUrl = "api/Cliente/";

  constructor(private http:HttpClient) { }


  getListClientes(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteCliente(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveCliente(cliente: Cliente): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, cliente);
  }
}
