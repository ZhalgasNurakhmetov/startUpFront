import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PlatformService} from "../../../services/platform/platform.service";
import {Mode} from "@ionic/core";
import {combineLatest, Observable, Subject} from "rxjs";
import {Resource, User} from "../../../core/models/user";
import {UserService} from "../../../services/user/user.service";
import {filter, finalize, take, takeUntil} from "rxjs/operators";
import {CurrentUserService} from "../../../services/current-user/current-user.service";
import {ProfileApi} from "./api/profile.api";

@Component({
  templateUrl: './profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit, OnDestroy {

  platform: Mode;
  user$: Observable<User>;
  user: User;
  personalResourceList: Resource[];
  interestedResourceList: Resource[];
  isFollowing: boolean;
  isLoading: boolean;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private profileApi: ProfileApi,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.user$ = this.userService.getUser();
    this.subscribeToUser();
  }

  follow(userId: string) {
    this.showLoading(true);
    this.profileApi.follow(userId)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(currentUser => {
        this.userService.setUser({
          ...this.user,
          followers: [
            currentUser,
          ]
        });
        this.currentUserService.setCurrentUser(currentUser);
      });
  }

  unfollow(userId: string) {
    this.showLoading(true);
    this.profileApi.unfollow(userId)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(currentUser => {
        const index = this.user.followers.findIndex(contact => contact.id === currentUser.id);
        this.user.followers.splice(index, 1);
        this.userService.setUser({
          ...this.user,
          followers: [
            ...this.user.followers,
          ]
        });
        this.currentUserService.setCurrentUser(currentUser);
      });
  }

  private subscribeToUser(): void {
    combineLatest([this.userService.getUser(), this.currentUserService.getCurrentUser()])
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(([user, currentUser]) => {
        this.user = user;
        this.personalResourceList = user.resourceList.filter(resource => resource?.personal);
        this.interestedResourceList = user.resourceList.filter(resource => !resource?.personal);
        const index = currentUser.following.findIndex(contact => contact.id === user?.id);
        this.isFollowing = index > -1;
        this.cd.markForCheck();
      });
  }

  private showLoading(isLoading: boolean): void{
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
