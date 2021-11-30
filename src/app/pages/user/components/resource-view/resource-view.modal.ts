import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {ModalController} from "@ionic/angular";
import {Resource, User} from "../../../../core/models/user";
import {CurrentUserService} from "../../../../services/current-user/current-user.service";
import {UserService} from "../../../../services/user/user.service";
import {combineLatest, Subject} from "rxjs";
import {finalize, take, takeUntil} from "rxjs/operators";
import {UserApi} from "../../api/user.api";

@Component({
  templateUrl: './resource-view.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserApi]
})
export class ResourceViewModal implements OnInit, OnDestroy{

  @Input() platform: Mode;
  @Input() resource: Resource;

  user: User;
  currentUser: User;
  currentUserId: string;
  isLoading: boolean;
  isFavorite: boolean;

  private unsubscribe$ = new Subject();

  constructor(
    private modalCtrl: ModalController,
    private cd: ChangeDetectorRef,
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private userApi: UserApi,
  ) { }

  ngOnInit(): void {
    this.subscribeToUser();
  }

  addToFavorite() {
    this.showLoading(true);
    this.userApi.addToFavorite(this.currentUserId, this.resource.id)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(response => {
        const index = this.user.resourceList.findIndex(res => res.id === this.resource.id);
        this.user.resourceList.splice(index, 1, response.resource);
        this.userService.setUser({
          ...this.user,
        });
        this.currentUserService.setCurrentUser({
          ...this.currentUser,
          favoriteResourceList: [
            ...this.currentUser.favoriteResourceList,
            response.favorite,
          ]
        });
        this.cd.markForCheck();
      });
  }

  removeFromFavorite(): void {
    this.showLoading(true);
    this.userApi.removeFavorite(this.currentUserId, this.resource.id)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(response => {
        const index = this.user.resourceList.findIndex(res => res.id === this.resource.id);
        this.user.resourceList.splice(index, 1, response.resource);
        this.userService.setUser({
          ...this.user,
        });
        const favoriteIndex = this.currentUser.favoriteResourceList.findIndex(fav => fav.id === response.favorite.id);
        this.currentUser.favoriteResourceList.splice(favoriteIndex, 1);
        this.currentUserService.setCurrentUser({
          ...this.currentUser,
        });
        this.cd.markForCheck();
      });
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  private subscribeToUser(): void {
    combineLatest([this.userService.getUser(), this.currentUserService.getCurrentUser()])
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(([user, currentUser]) => {
        const index = currentUser.favoriteResourceList.findIndex(favorite => favorite.resourceId === this.resource?.id);
        this.isFavorite = index > -1;
        this.user = user;
        this.currentUser = currentUser;
        this.currentUserId = currentUser.id;
        this.cd.markForCheck();
      });
  }

  private showLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
