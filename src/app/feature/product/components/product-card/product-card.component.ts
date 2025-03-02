import { Component, EventEmitter, inject, Input, input, Output, output } from '@angular/core';
import { Product } from '../../models/products';
import { RouterLink } from '@angular/router';
import { CartServiceService } from '../../../cart/services/cart-service.service';


@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product
  @Output() addToCartEvent = new EventEmitter<string>()
  @Output() addToWishList = new EventEmitter<string>()
  
  
 
  onAddToCart(id:string) {
  this.addToCartEvent.emit(id)
  }
  
  onAddToWhishList(productId: string) {
    this.addToWishList.emit(productId)
  }
}
