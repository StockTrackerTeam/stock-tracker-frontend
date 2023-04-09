import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserEntity } from '../core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const userLogged: UserEntity = JSON.parse(localStorage.getItem('user') as string);

    if (userLogged !== null && userLogged !== undefined) {
      if (route.data['roleId'].includes(userLogged.roleId)) {
        return true;
      } else {
        // TODO - we are redirecting to /login for now, but in a future it should redirect to the corresponding path
        this.router.navigate(['']);
        return false;
      }
    }
    this.router.navigate(['']);
    return false;
  }
  
}
