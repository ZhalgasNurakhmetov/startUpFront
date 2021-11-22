import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ProfileApi} from './api/profile.api';
import {CurrentUserService} from '../../services/current-user/current-user.service';
import {AppRoutes} from '../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class ProfilePageGuard implements CanActivate{

  constructor(
    private profileApi: ProfileApi,
    private currentUserService: CurrentUserService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.profileApi.getCurrentUser()
      .pipe(
        map(user => {
          if (user) {
            this.currentUserService.setCurrentUser(user);
            return true;
          }
          return this.router.createUrlTree([AppRoutes.login]);
        }),
        catchError(() => of(this.router.createUrlTree([AppRoutes.login])))
      );
  }

}
