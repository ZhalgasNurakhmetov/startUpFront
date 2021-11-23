import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {SingleTimeService} from "./services/single-time/single-time.service";
import {Observable, of} from "rxjs";
import {AppRoutes} from "./app.routes";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SlidesPageGuard implements CanActivate{

  constructor(
    private singleTimeService: SingleTimeService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.singleTimeService.getIsNotFirstTime()
      .pipe(
        map(isNotFirstTime => {
          if (isNotFirstTime) {
            return this.router.createUrlTree([AppRoutes.tabs]);
          }
          return true;
        }),
        catchError(() => of(this.router.createUrlTree([AppRoutes.login])))
      );
  }

}
