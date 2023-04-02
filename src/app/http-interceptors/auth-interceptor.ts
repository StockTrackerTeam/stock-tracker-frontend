import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../core/rest/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor (private readonly auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.token;
    let authReq: HttpRequest<any> = req;
  
    if (authToken !== undefined && this.auth.currentUser !== undefined) { 
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }

    return next.handle(authReq);
  }
}
