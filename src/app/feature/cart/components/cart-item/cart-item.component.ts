import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/cart';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  @Input() cardItems!: Product
  @Output() removeId = new EventEmitter<string>()
  @Output() updateQty = new EventEmitter<{productId:string, newCount:number}>()
 
  removeItem(id: string) {
    this.removeId.emit(id)
  }

  updateQuty(productId:string, newCount:number) {
    this.updateQty.emit({productId,newCount})
  }
}
