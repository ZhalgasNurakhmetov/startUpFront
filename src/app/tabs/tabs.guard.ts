import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {TabsApi} from "./api/tabs.api";
import {CurrentUserService} from "../services/current-user/current-user.service";
import {catchError, map} from "rxjs/operators";
import {AppRoutes} from "../app.routes";
import {Observable, of} from "rxjs";


@Injectable()
export class TabsGuard implements CanActivate{

  constructor(
    private tabsApi: TabsApi,
    private currentUserService: CurrentUserService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tabsApi.getCurrentUser()
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
