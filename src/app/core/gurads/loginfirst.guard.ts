import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Inject, inject } from '@angular/core';


export const loginfirstGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router) 

  if (authService.haveToken()) {
    return true
  }
  router.navigate(['/login'])
  return true
};
