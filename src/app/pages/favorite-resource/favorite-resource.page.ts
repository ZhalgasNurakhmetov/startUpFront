import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {User, UserLike} from "../../core/models/user";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {ModalService} from "../../services/modal/modal.service";
import {ResourceViewModal} from "./modals/resource-view/resource-view.modal";
import {FavoriteResourceApi} from "./api/favorite-resource.api";
import {take, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  templateUrl: './favorite-resource.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteResourcePage implements OnInit, OnDestroy {

  platform: Mode;
  resourceList: UserLike[];
  currentUser: User;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private currentUserService: CurrentUserService,
    private modalService: ModalService,
    private favoriteResourceApi: FavoriteResourceApi,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.subscribeToCurrentUser();
  }

  openResourceViewModal(resource: UserLike): void {
    this.modalService.open(ResourceViewModal, this.platform, {resource: resource.resource, platform: this.platform});
  }

  unlikeResource(removingResource: UserLike): void {
    this.favoriteResourceApi.unlikeResource(this.currentUser.id, removingResource.resourceId)
      .pipe(
        take(1),
      )
      .subscribe(() => {
        const filteredFavoriteResourceList = this.resourceList.filter(resource => resource.resourceId !== removingResource.resourceId);
        this.currentUserService.setCurrentUser({
          ...this.currentUser,
          favoriteResourceList: [
            ...filteredFavoriteResourceList
          ],
        });
        this.cd.markForCheck();
      });
  }

  private subscribeToCurrentUser(): void {
    this.currentUserService.getCurrentUser()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(user => {
        this.currentUser = user;
        this.resourceList = user.favoriteResourceList;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
