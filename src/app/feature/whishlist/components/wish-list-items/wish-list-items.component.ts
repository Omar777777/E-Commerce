import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { WishListDetailes } from '../../models/wishlist';

@Component({
  selector: 'app-wish-list-items',
  imports: [],
  templateUrl: './wish-list-items.component.html',
  styleUrl: './wish-list-items.component.css'
})
export class WishListItemsComponent {
  @Input() productWishList!: WishListDetailes
  @Output() removeCart = new EventEmitter<string>()
  @Output() moveToCart = new EventEmitter<string>()
  

  removeProductFromWishList(id:string) {
    this.removeCart.emit(id)
  }

  moveProductToCart(id: string) {
    this.moveToCart.emit(id)
    
  }
  

}
