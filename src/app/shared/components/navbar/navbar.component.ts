import { CartItem } from './../../../feature/order/models/order';
import { Component, inject, Input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartServiceService } from '../../../feature/cart/services/cart-service.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() layout!: string;
  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartServiceService)
  private readonly platformId = inject(PLATFORM_ID)
  cartItems!: number
  

  ngOnInit() {
     this.cartService.cartCounter.subscribe({
      next:
        (value) => { 
          
          this.cartItems = value

        }
     })
    if (isPlatformBrowser(this.platformId) && this.layout === 'user') {
      this.getcartItemsOnRefresh()   
    }
    
  
    
  }

  getcartItemsOnRefresh() {
    this.authService.verifyToken().subscribe({
      next: (res) => {
        if (res.message == 'verified') {
            this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartItems = res.numOfCartItems
    }
  })
          
        }
      }, error: () => {
        this.authService.logout()
      }
    })
    
  }

   
  


  logout(): void {
    this.authService.logout()
  }



  

}
