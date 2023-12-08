import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn,Router } from '@angular/router';
import {AuthService} from 'src/app/services/auth.service'


export const adminGuardGuard: CanActivateFn = (route , state) => {

  
  
  const authService = inject(AuthService);
  return authService.isAdmin();
  
};