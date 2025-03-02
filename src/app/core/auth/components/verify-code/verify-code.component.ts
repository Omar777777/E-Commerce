import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';


@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule, ValidationMessagesComponent, RouterLink],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {

     private readonly authService = inject(AuthService)
      private readonly routeService = inject(Router)
      errorMsg: string = ""
      isloading:boolean = true
    
      authForm = new FormGroup({
        resetCode: new FormControl(null, [
          Validators.required,
        ]),
      
      })
      
    
    
      submitRegister() {
        this.isloading = false
        if (this.authForm.valid) {
          this.authService.verifyCode(this.authForm.value).subscribe({
            next: (res) => {
              console.log(res)
              if (res.status == "Success") {
                
              this.isloading = true
              this.routeService.navigate(['/reset-password'])  
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
