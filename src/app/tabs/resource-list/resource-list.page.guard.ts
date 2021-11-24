import {Injectable} from '@angular/core';
import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CurrentUserService} from '../../services/current-user/current-user.service';
import {AppRoutes} from '../../app.routes';
import {TabRoutes} from "../tab.routes";

@Injectable()
export class ResourceListPageGuard implements CanActivate{

  constructor(
    private currentUserService: CurrentUserService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.currentUserService.getCurrentUser()
      .pipe(
        map(user => {
          if (user) {
            return true;
          }
          return this.router.createUrlTree([AppRoutes.tabs, TabRoutes.profile]);
        }),
        catchError(() => of(this.router.createUrlTree([AppRoutes.login])))
      );
  }

}
