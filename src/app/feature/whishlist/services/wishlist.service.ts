import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly httpClient = inject(HttpClient)


  getLoggedUserWishList(): Observable<any> {
    return this.httpClient.get(enviroments.baseUrl+'wishlist')
  }

  addProductToWishList(productId:string): Observable<any> {
    return this.httpClient.post(enviroments.baseUrl + 'wishlist', {productId:productId})
  }

  remmoveProductFromWishList(productId:string): Observable<any> {
    return this.httpClient.delete(enviroments.baseUrl + `wishlist/${productId}`)
  }

}
