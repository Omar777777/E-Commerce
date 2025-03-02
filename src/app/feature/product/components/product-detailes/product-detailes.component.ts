import { ProductsService } from './../../services/products.service';
import { Product } from './../../models/products';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CartServiceService } from '../../../cart/services/cart-service.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';
import { WishlistService } from '../../../whishlist/services/wishlist.service';
import { WishListDetailes } from '../../../whishlist/models/wishlist';

@Component({
  selector: 'app-product-detailes',
  imports: [NgFor, CarouselModule],
  templateUrl: './product-detailes.component.html',
  styleUrl: './product-detailes.component.css'
})
export class ProductDetailesComponent {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)
  private readonly toastrService = inject(ToastrService)
  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartServiceService)
  private readonly wishListService = inject(WishlistService)
  oneProductDetailes:Product = {} as Product
  productId!:string|null
   productFound:Product | undefined = undefined
  allproducts: Product[] = []
  wishlistProducts: WishListDetailes[] = [] 
  favFlag!:boolean
  

  getProductFromWishList() {
     
      this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
     this.wishListService.getLoggedUserWishList().subscribe({
      next: ({ data }) => {
        this.wishlistProducts = data
         this.getProductId()
        this.getAllProducts()

      }
    })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
      })
    
    
 
  }

   getAllProducts() {

    this.productsService.getAllProducts().subscribe({
     next: ( {data}) => { 
      this.allproducts = data.map((product:Product) => ({
        ...product,
        isInWishlist: this.IsInWhishList(product._id)

      }));
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

  
  findProduct(productID: string|null) {
     this.productFound = this.allproducts.find(function (product) {
      return product._id ==  productID 
     })
    
  
  }
  
  wishList() {
    this.findProduct(this.productId)
    if (this.productFound?.isInWishlist == false) {
           this.favFlag = true
      this.addProductTowishlist(this.productId)
    } else {
       this.favFlag = false
      this.removeProductFromwishlist(this.productId)
    }
    
  }

 
 


  

  getProductId() {
    this.activatedRoute.paramMap.subscribe({
      next: (url) => {
        this.productId = url.get('id')
        this.getProductDetailes()
        let productStatus: boolean = this.IsInWhishList(this.productId!)
    if (productStatus == false) {
           this.favFlag = false
    } else {
       this.favFlag = true
    }
      }
    })
  }


  addProductTowishlist(productId: string|null) {
      this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
          this.wishListService.addProductToWishList(productId!).subscribe({
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

   removeProductFromwishlist(productId:string|null) {
        this.authService.verifyToken().subscribe({
      next: (res) => {
        

        if (res.message == 'verified') {
    this.wishListService.remmoveProductFromWishList(productId!).subscribe({
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

  getProductDetailes() {

      this.authService.verifyToken().subscribe({
      next: (res) => {

        if (res.message == 'verified') {
       this.productsService.getProductDetailes(this.productId).subscribe({
      next: ({ data }) => {
           this.oneProductDetailes = data
      }
    })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
  }

  ngOnInit() {
     this.getProductFromWishList()
  }




   showSuccess(msg:string) {
     this.toastrService.success('', msg, {
       progressBar: true,
       progressAnimation: 'decreasing',
       timeOut:1500
    });
  }

  onAddToCart() {
    this.authService.verifyToken().subscribe({
      next: (res) => {

        if (res.message == 'verified') {
          this.cartService.addProductToCart(this.productId!).subscribe({
          next: (res) => {
              this.showSuccess('Product Added Successfully')
              this.cartService.cartCounter.next(res.numOfCartItems)
              this.wishListService.remmoveProductFromWishList(this.productId!).subscribe({
                next: () => {
                  this.favFlag = false

                }
              })
              
        }
            
    })
          
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
  
  }






  customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 1
        },
        740: {
          items: 1
        },
        940: {
          items: 1
        }
      },
      nav: true
    }

}
