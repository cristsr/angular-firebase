import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean> {
    return this.authService.getUser().pipe(
      map(user => {
        console.log('[HOME GUARD canActivate] user: ', user);
        if (!user) {
          this.router.navigate(['auth/login']);
          return false;
        }

        if (!user.emailVerified) {
          this.router.navigate(['auth/email-verification']);
          return false;
        }

        return true;
      })
    );
  }
}
