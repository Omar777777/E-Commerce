import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, ValidationMessagesComponent, RouterLink],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {

      private readonly authService = inject(AuthService)
      private readonly routeService = inject(Router)
      errorMsg: string = ""
      isloading:boolean = true
    
      authForm = new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
        ]),
      })
      
    
    
      submitRegister() {
        this.isloading = false
        if (this.authForm.valid) {
          this.authService.forgetpassword(this.authForm.value).subscribe({
            next: (res) => {
              
              if (res.statusMsg == "success") {
              this.isloading = true
              this.routeService.navigate(['/verify-code'])  
              }
             
              
            },
            error: ({ error }) => {
              
              this.isloading = true
              this.errorMsg = error.message
              
            }
          })
    
    
        }
        
      }
    

}
