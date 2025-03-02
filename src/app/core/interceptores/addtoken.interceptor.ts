import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

export const addtokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authServic = inject(AuthService)
  if (req.url.includes('signin') || req.url.includes('signup') || req.url.includes('forgotPasswords') || req.url.includes('verifyResetCode') || req.url.includes('resetPassword')) {
    
  } else {
    req = req.clone({
      setHeaders: {
        token: authServic.getToken()!
      }
    })
  }
  return next(req);
};
