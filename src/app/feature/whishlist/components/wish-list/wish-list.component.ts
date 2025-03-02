import { Component, inject } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { Observable } from 'rxjs';
import { WishList } from '../../models/wishlist';
import { WishListItemsComponent } from "../wish-list-items/wish-list-items.component";
import { CartServiceService } from '../../../cart/services/cart-service.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-wish-list',
  imports: [WishListItemsComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {

  private readonly wishlistService = inject(WishlistService)
  private readonly cartService = inject(CartServiceService)
  private readonly authService = inject(AuthService)
  wishListProduct:WishList = {} as WishList

  ngOnInit() {
    this.getLoggedUserWishList()
  }
  getLoggedUserWishList() {
         this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
   this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wishListProduct = res
      }
    })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })  
  }


  removeProduFromWhishList(productId: string) {

            this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
  this.wishlistService.remmoveProductFromWishList(productId).subscribe({
      next: () => {
        this.getLoggedUserWishList()
      }
    })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
    
  }


  moveProdutToCart(productId: string) {

              this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
 
    this.cartService.addProductToCart(productId).subscribe({
      next: () => {
        this.removeProduFromWhishList(productId)
      }
    })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })

   
  } 

}
