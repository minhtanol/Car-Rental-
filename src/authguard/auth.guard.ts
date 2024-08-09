import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";
import {inject} from "@angular/core";
import {StoreUrlService} from "../service/storeUrl.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const storeUrlService= inject(StoreUrlService);
  const router = inject(Router);
  const isLoggedIn = !!authService.getToken();

  if (!isLoggedIn) {
    storeUrlService.setStoreUrl(router.url);
    router.navigate(['/account/login']);
  }
  return isLoggedIn;
};
