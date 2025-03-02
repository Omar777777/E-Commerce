import { Component, inject } from '@angular/core';
import {AbstractControl, AbstractControlDirective, EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ValidationMessagesComponent } from "../../../../shared/components/validation-messages/validation-messages.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ValidationMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService)
  private readonly routeService = inject(Router)
  errorMsg: string = ""
  isloading:boolean = true

  authForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),

    email: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    ]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^0\d{10}$/)
    ]),
  
  }, { validators: this.rePassValidation })
  
  
  rePassValidation(control: AbstractControl) {
    let pass = control.get('password')?.value
    let repass = control.get('rePassword')?.value

    if (pass == repass) {
      return null
    } else {
      return {
        mismatch:true
        
      } 
    }
    
  }


  submitRegister() {
    this.isloading = false
    if (this.authForm.valid) {
      this.authService.register(this.authForm.value).subscribe({
        next: (res) => {
          this.isloading = true
          this.routeService.navigate(['/login'])
          
        },
        error: ({ error }) => {
          this.isloading = true
          this.errorMsg = error.message
          
        }
      })


    }
    
  }

}
