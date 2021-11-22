import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {AppRoutes} from "./app.routes";
import {catchError, map} from "rxjs/operators";
import {AuthService} from "./core/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TabsPageGuard implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getToken()
      .pipe(
        map(token => {
          if (token) {
            return true;
          }
          return this.router.createUrlTree([AppRoutes.login]);
        }),
        catchError(() => of(this.router.createUrlTree([AppRoutes.login])))
      );
  }

}
