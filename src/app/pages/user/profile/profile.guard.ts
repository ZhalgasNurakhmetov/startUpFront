import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from "@angular/router";
import {ProfileApi} from "./api/profile.api";
import {UserService} from "../../../services/user/user.service";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {AppRoutes} from "../../../app.routes";
import {TabRoutes} from "../../../tabs/tab.routes";


@Injectable()
export class ProfilePageGuard implements CanActivate{

  constructor(
    private profileApi: ProfileApi,
    private userService: UserService,
    private router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.profileApi.getUser(route.params.id)
      .pipe(
        map(user => {
          if (user) {
            this.userService.setUser(user);
            return true;
          }
          return this.router.createUrlTree([AppRoutes.tabs, TabRoutes.profile]);
        }),
        catchError(() => of(this.router.createUrlTree([AppRoutes.tabs, TabRoutes.profile])))
      );
  }

}
