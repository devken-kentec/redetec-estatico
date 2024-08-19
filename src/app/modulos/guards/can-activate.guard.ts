import { inject } from '@angular/core';
import { LoginService } from './../login/shared/login.service';
import { CanActivateChildFn, Router } from '@angular/router';

export const canActivateGuard: CanActivateChildFn = (childRoute, state) => {
  const loginService = inject(LoginService);
  const retorno = loginService.autenticatedTrue();
  // if(loginService.autenticatedTrue() === true){
  //   return true;
  // }
  return true;
};


