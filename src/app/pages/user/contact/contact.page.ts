import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../../services/platform/platform.service";
import {AppRoutes} from "../../../app.routes";
import {UserRoutes} from "../user.routes";
import {takeUntil} from "rxjs/operators";
import {UserService} from "../../../services/user/user.service";
import {UserBase} from "../../../core/models/user";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../../services/current-user/current-user.service";
import {TabRoutes} from "../../../tabs/tab.routes";

@Component({
  templateUrl: './contact.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage implements OnInit, OnDestroy {

  platform: Mode;
  isFollowingList = true;
  following: UserBase[];
  followers: UserBase[];
  currentUserId: string;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private currentUserService: CurrentUserService,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.currentUserId = this.currentUserService.getCurrentUserId();
    this.subscribeToCurrentUser();
  }

  chooseContactList(): void {
    this.isFollowingList = !this.isFollowingList;
  }

  navigateToUserPage(id: string): void {
    if (id === this.currentUserId) {
      this.router.navigate([AppRoutes.tabs, TabRoutes.profile]);
      return;
    }
    this.router.navigate([AppRoutes.user, UserRoutes.profile, id]);
  }

  private subscribeToCurrentUser(): void {
    this.userService.getUser()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(currentUser => {
        this.following = currentUser.following;
        this.followers = currentUser.followers;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
