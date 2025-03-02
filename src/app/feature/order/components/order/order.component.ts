import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  private readonly orderService = inject(OrderService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly authService = inject(AuthService)
      errorMsg: string = ""
      isloading: boolean = true
      cartId: string | null = ''
  checkoutForm!: FormGroup


  fillForm() {
      this.checkoutForm = new FormGroup({
        details: new FormControl(null, [
          Validators.required,
        ]),
        phone: new FormControl(null, [
          Validators.required,
        ]),
         city: new FormControl(null, [
          Validators.required,
        ]),
      
      })
    
  }
  
    
  
  ngOnInit() {
    this.getCartId()
    this.fillForm()

  }

 

  getCartId() {

        this.authService.verifyToken().subscribe({
      next: (res) => {

          if (res.message == 'verified') {
          
       this.activatedRoute.paramMap.subscribe({
      next: (data) => {
           this.cartId = data.get('id')  
      }
    })
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
  }

 
      
    
    
      submitRegister() {
        this.isloading = false



         this.authService.verifyToken().subscribe({
           next: (res) => {
             if (res.message == 'verified') {
               
                 if (this.checkoutForm.valid) {
          this.orderService.getShippingInfo(this.cartId, this.checkoutForm.value).subscribe({
            next: (res) => {
              this.isloading = true
              open(res.session.url,"_self")
            },
          })
                   
          
    
    
        }
            
        }
        
      }, error: () => {
        this.authService.logout()
        
      }
    })
        


      
        
      }
    
  

}
