import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {UserBase} from "../../core/models/user";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";
import {UserRoutes} from "../user/user.routes";

@Component({
  templateUrl: './contact.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage implements OnInit, OnDestroy {

  platform: Mode;
  isFollowingList = true;
  following: UserBase[];
  followers: UserBase[];

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private currentUserService: CurrentUserService,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.subscribeToCurrentUser();
  }

  chooseContactList(): void {
    this.isFollowingList = !this.isFollowingList;
  }

  navigateToUserPage(id: string): void {
    this.router.navigate([AppRoutes.user, UserRoutes.profile, id]);
  }

  private subscribeToCurrentUser(): void {
    this.currentUserService.getCurrentUser()
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
