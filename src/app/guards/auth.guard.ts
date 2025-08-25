import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let role=localStorage.getItem("user")
  let router=inject(Router)
  if(!role){
    router.navigateByUrl("/login")
    return false
  }
  return true;
};
