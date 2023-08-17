import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private myAppUrl = "https://localhost:44361/";
  private myApiUrl = "api/Producto/";

  constructor(private http:HttpClient) { }


  getListProductos(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteProducto(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveProducto(producto: Producto): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, producto);
  }

  updateProducto(id: number, producto: Producto): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, producto);
  }
}
