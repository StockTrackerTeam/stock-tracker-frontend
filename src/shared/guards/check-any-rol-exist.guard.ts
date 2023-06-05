import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, noop, tap, map } from 'rxjs';
import { RoleService } from '../../app/core/rest/services/role.service';
import { RoleEntity } from '../../app/core/models';

@Injectable({
  providedIn: 'root'
})
export class CheckAnyRoleExistGuard implements CanActivate {
  anyRole!: RoleEntity;

  constructor (
    private readonly roleService: RoleService,
    private readonly router: Router
  ) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.roleService.checkIfAnyRoleExists()
      .pipe(
        map(response => {
          if (response) {
            return true;
          } else {
            this.router.navigate(['/users'])
            return false;
          }
        })
      )
  }
}
