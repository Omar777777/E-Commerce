
import { Component, inject, Input } from '@angular/core';
import { CartServiceService } from '../../services/cart-service.service';
import { Cart, Product} from '../../models/cart';
import { CartItemComponent } from "../cart-item/cart-item.component";
import { RouterLink } from '@angular/router';
import { log } from 'console';
import { AuthService } from '../../../../core/auth/services/auth.service';


@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent,RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
isloading:boolean = false

  private readonly cartService = inject(CartServiceService)
  private readonly authService = inject(AuthService)
  cartDetailes:Cart = {} as Cart

  getLoggedCart() {

      this.authService.verifyToken().subscribe({
      next: (res) => {

          if (res.message == 'verified') {
          
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetailes =res
        this.isloading= true
      }
    })
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
  }



  removeItemFromCart(productid: string) {
    

    this.authService.verifyToken().subscribe({
      next: (res) => {

        if (res.message == 'verified') {
          
      this.cartService.RemoveCartItem(productid).subscribe({
      next: (res) => {
          this.cartDetailes = res
          this.cartService.cartCounter.next(res.numOfCartItems)
      }
    })
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })


  
  }

  updateItemQuantity(productId: string, count: Number) {

     this.authService.verifyToken().subscribe({
      next: () => {
        this.cartService.updateCartProductQuantity(productId,count).subscribe({
      next: (res) => {
         this.cartDetailes =res
      }
    })
        
      }, error: () => {
        this.authService.logout()
        
      }
    })


    
  }

  ngOnInit() {
    this.getLoggedCart()
  }

}
