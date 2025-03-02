import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroments } from '../../../../enviroments/enviroments';
import { AuthService } from '../../../core/auth/services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private readonly httpClient = inject(HttpClient)
  private readonly authService = inject(AuthService)
  cartCounter:BehaviorSubject<number> = new BehaviorSubject<number>(0)

  addProductToCart(productId:string):Observable<any> {
   return this.httpClient.post(enviroments.baseUrl + 'cart',
     {
      productId:productId
      
    })
  }


  
  updateCartProductQuantity(productId:string, count:Number):Observable<any> {
   return this.httpClient.put(enviroments.baseUrl + 'cart/'+productId,
    {
      count:count
      
    })
  }


  getLoggedUserCart():Observable<any> {
   return this.httpClient.get(enviroments.baseUrl + 'cart')
  }


  RemoveCartItem(productId:string):Observable<any> {
  return  this.httpClient.delete(enviroments.baseUrl + 'cart/'+productId)
  }


  clearUserCart():Observable<any> {
    return this.httpClient.put(enviroments.baseUrl + 'cart/',
      {
        
      })
  }





}
