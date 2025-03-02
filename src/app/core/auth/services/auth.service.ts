import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../../../enviroments/enviroments';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly httpClient = inject(HttpClient)
  private readonly route = inject(Router)

  register(userinfo:any): Observable<any> {
    return this.httpClient.post(enviroments.baseUrl+'auth/signup',userinfo)
  }

  login(userinfo:any): Observable<any> {
    return this.httpClient.post(enviroments.baseUrl+'auth/signin',userinfo)
  }

  setToken(token:string):void {
    if (typeof localStorage != "undefined") {
      localStorage.setItem("authToken",token)
    }
  }

  getToken(): string | null {
    if (typeof localStorage != "undefined") {
      return localStorage.getItem("authToken")
    }
    return null
  }

  haveToken(): boolean {
    
     if (typeof localStorage != "undefined") {
      return !!localStorage.getItem("authToken")
    }
    return false
  }

  logout() {
    this.route.navigate(['/login'])

    if (typeof localStorage != "undefined") {
      localStorage.clear()
    }
  }

  verifyToken(): Observable<any> {
    return this.httpClient.get(enviroments.baseUrl + 'auth/verifyToken')
  }

  forgetpassword(email:any): Observable<any> {
    return this.httpClient.post(enviroments.baseUrl + 'auth/forgotPasswords', email)
  }

  verifyCode(resetCode:any): Observable<any> {
    return this.httpClient.post(enviroments.baseUrl + 'auth/verifyResetCode', resetCode)
  }

  
   resetPassword(newUserInfo:any): Observable<any> {
    return this.httpClient.put(enviroments.baseUrl + 'auth/resetPassword', newUserInfo)
  }
  
}
