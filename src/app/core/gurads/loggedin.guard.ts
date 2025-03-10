import { inject,  } from '@angular/core';
import { CanActivateFn, Router,  } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)


  if (authService.haveToken()) {
      router.navigate(['/home'])
      return false
    }
    return true
};
