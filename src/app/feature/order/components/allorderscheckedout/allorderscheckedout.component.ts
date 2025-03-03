import { Orders } from './../../models/order';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { Component, Inject, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { CartServiceService } from '../../../cart/services/cart-service.service';

@Component({
  selector: 'app-allorderscheckedout',
  imports: [],
  templateUrl: './allorderscheckedout.component.html',
  styleUrl: './allorderscheckedout.component.css'
})
export class AllorderscheckedoutComponent {
  private readonly orderServices = inject(OrderService)
  private readonly authService = inject(AuthService)
  userId!: string 
  AllOrders: Orders = []
  
  
  ngOnInit() {
    this.getUserId()
  }

  getUserId() {
    this.authService.verifyToken().subscribe({
      next: (res) => {
        if (res.message == 'verified') {
          this.userId = res.decoded.id
        this.getAllOrders()        
        }
        
      }, error: () => {
        this.authService.logout()
      }
    })
  }

  getAllOrders() {
    this.orderServices.getallUserOrders(this.userId).subscribe({
      next: (res) => {
        this.AllOrders = res
      }
    })
    
  }
  

}
