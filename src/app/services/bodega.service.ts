import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bodega } from '../models/bodega.model';
@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  private myAppUrl = "https://localhost:44361/";
  private myApiUrl = "api/Bodega/";

  constructor(private http:HttpClient) { }


  getListBodegas(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteBodega(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveBodega(bodega: Bodega): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, bodega);
  }

  updateBodega(id: number, bodega: Bodega): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, bodega);
  }
}
