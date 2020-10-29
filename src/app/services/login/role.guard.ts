import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
import { Locker, DRIVERS } from 'angular-safeguard';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

export class RoleGuard implements CanActivate {
  constructor(private router: Router,
    private locker: Locker,
    @Inject(SESSION_STORAGE) private storage: StorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const allowedRoles = route.data.allowedRoles;
    const redirectTo = route.data.redirectTo;
    const storageKey = route.data.key;

    if (this.getSession() && this.validateAccess(allowedRoles, storageKey)) {
      return true;
    }

    this.router.navigate([redirectTo], { queryParams: { returnUrl: state.url } });
    return false;
  }

  getSession() {
    return this.locker.get(DRIVERS.SESSION, 'currentSession');
  }

  validateAccess(allowedRoles, storageKey) {
    const currentRole = this.storage.get(storageKey)
    return (currentRole) ? (allowedRoles.includes(currentRole)) : false;
  }
}