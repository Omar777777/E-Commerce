import { SearchProductsPipe } from './../../../../shared/pispes/search-products.pipe';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CartServiceService } from '../../../cart/services/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { WishlistService } from '../../../whishlist/services/wishlist.service';
import { FormsModule } from '@angular/forms';
import { WishListDetailes } from '../../../whishlist/models/wishlist';


@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent, SearchProductsPipe, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private readonly productsservice = inject(ProductsService)
  private readonly cartService = inject(CartServiceService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishListService = inject(WishlistService)

  
  searchTerm: string = ''
  allproducts: Product[] = []
  productFound:Product | undefined = undefined
  private readonly authService = inject(AuthService)
  productId!: string
  wishlistProducts: WishListDetailes[] = [] 

  
  
  getProductFromWishList() {
      
     this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
       this.wishListService.getLoggedUserWishList().subscribe({
      next: ({ data }) => {
        this.wishlistProducts = data
        this.getAllProducts()

      }
    })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
   
  }


  IsInWhishList(productId:string):boolean {
    return this.wishlistProducts.some(function (whislist) {
      if (whislist._id == productId)
        return true
      else
        return false

    
  })
}

  getAllProducts() {

    this.productsservice.getAllProducts().subscribe({
     next: ( {data}) => { 
      this.allproducts = data.map((product:Product) => ({
        ...product,
        isInWishlist: this.IsInWhishList(product._id)

      }));
        
    }
    })
    
  }
  showSuccess(msg: string) {
    this.toastrService.success('', msg, {
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 1500
    });
  }
  
  onAddToCart(id: string) {
    this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
          this.cartService.addProductToCart(id).subscribe({
            next: (res) => {
              this.showSuccess('Product Added To Cart Successfully')
              this.cartService.cartCounter.next(res.numOfCartItems)
            }
            
          })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
  
  }

  

  ngOnInit(): void {
    this.getProductFromWishList()
  }


 


  findProduct(productID: string) {
     this.productFound = this.allproducts.find(function (product) {
      return product._id ==  productID 
     })
    
  
}

  getProductId(productId: string) {
    this.productId = productId
    this.getProductFromWishList()
    this.findProduct(this.productId)
    if (this.productFound?.isInWishlist == false) {
      this.addProductTowishlist(this.productId)
    } else {
      this.removeProductFromwishlist(this.productId)
      
    }
    
    
    
   
    
  }

  addProductTowishlist(productId: string) {

      this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
          this.wishListService.addProductToWishList(productId).subscribe({
      next: () => {
              this.getProductFromWishList()
              this.showSuccess('Product Added To WishList Successfully')
      }
    })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
   
    
    
  }

  removeProductFromwishlist(productId: string) {
     
     this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
    this.wishListService.remmoveProductFromWishList(productId).subscribe({
      next: (res) => {
        this.getProductFromWishList()
        this.showSuccess('Product Removed From WishList Successfully')
      }
    })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
   
}
    
    
}



