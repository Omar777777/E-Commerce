import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ValidationMessagesComponent } from '../../../../shared/components/validation-messages/validation-messages.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ValidationMessagesComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    private readonly authService = inject(AuthService)
    private readonly routeService = inject(Router)
    errorMsg: string = ""
    isloading:boolean = true
  
    authForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      ]),
    
    })
    
  
  
    submitRegister() {
      this.isloading = false
      if (this.authForm.valid) {
        this.authService.login(this.authForm.value).subscribe({
          next: (res) => {
            if (res.message == "success") {
            this.authService.setToken(res.token)
            this.isloading = true
            this.routeService.navigate(['/home'])  
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
