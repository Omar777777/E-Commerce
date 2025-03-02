import { enviroments } from './../../../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly httpclient = inject(HttpClient)
  
  getAllProducts(): Observable<any> {
    return this.httpclient.get(enviroments.baseUrl+'products')
  }

  getProductDetailes(id:string|null): Observable<any> {
    return this.httpclient.get(enviroments.baseUrl+`products/${id}`)
  }
}
