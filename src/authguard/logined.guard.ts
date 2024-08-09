import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";

export const loginedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = !!authService.getToken();

  if (isLoggedIn) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
