import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = this.authService.getToken();

    if (authToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });

      return next.handle(cloned);
    } else {

      return next.handle(req);
    }
  }
}
