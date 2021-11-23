import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from "../../core/models/user";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";
import {Observable} from "rxjs";

@Component({
  templateUrl: './profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {

  currentUser$: Observable<User>;
  platform: Mode;

  constructor(
    private currentUserService: CurrentUserService,
    private platformService: PlatformService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.currentUser$ = this.currentUserService.getCurrentUser();
  }

  navigateToFavorite(): void {
    this.router.navigate([AppRoutes.favorites]);
  }

}
