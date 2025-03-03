import { AuthService } from './../../../core/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly httpClient = inject(HttpClient)
  private readonly authService = inject(AuthService)

  getShippingInfo(cartId: string | null, shippingAddress: { details: string, phone: number, city: string }): Observable<any> {
   const returnurl = "?url=https://e-commerce-kappa-ten-75.vercel.app/#"
    return this.httpClient.post(enviroments.baseUrl + `orders/checkout-session/${cartId}` + returnurl,
      {
      shippingAddress:shippingAddress
      })
  }


  getUserId(cartId: string | null, shippingAddress: { details: string, phone: number, city: string }): Observable<any> {
    return this.httpClient.post(enviroments.baseUrl +`orders/${cartId}`,
      {
      shippingAddress:shippingAddress
      })
  }

  getallUserOrders(userId:string): Observable<any> {
    return this.httpClient.get(enviroments.baseUrl + `orders/user/${userId}`)
  }

  


}
