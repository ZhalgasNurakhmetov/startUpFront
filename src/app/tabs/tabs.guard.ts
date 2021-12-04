import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {TabsApi} from "./api/tabs.api";
import {CurrentUserService} from "../services/current-user/current-user.service";
import {catchError, map} from "rxjs/operators";
import {AppRoutes} from "../app.routes";
import {Observable, of} from "rxjs";
import {WebSocketService} from "../services/webSocket/web-socket.service";


@Injectable()
export class TabsGuard implements CanActivate{

  constructor(
    private tabsApi: TabsApi,
    private currentUserService: CurrentUserService,
    private router: Router,
    private webSocketService: WebSocketService,
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.tabsApi.getCurrentUser()
      .pipe(
        map(user => {
          if (user) {
            this.currentUserService.setCurrentUser(user);
            this.webSocketService.connectToWebSocket(user.id);
            return true;
          }
          return this.router.createUrlTree([AppRoutes.login]);
        }),
        catchError(() => of(this.router.createUrlTree([AppRoutes.login])))
      );
  }

}
