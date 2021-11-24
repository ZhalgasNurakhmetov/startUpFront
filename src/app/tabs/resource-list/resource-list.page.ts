import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {finalize, take, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Resource, User} from "../../core/models/user";
import {ResourceListApi} from "./api/resource-list.api";

@Component({
  templateUrl: './resource-list.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListPage implements OnInit, OnDestroy {

  platform: Mode;
  personalResourceList: Resource[];
  interestedResourceList: Resource[];
  currentUser: User;
  isPersonal = true;
  isLoading: boolean;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private currentUserService: CurrentUserService,
    private cd: ChangeDetectorRef,
    private resourceListApi: ResourceListApi,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.subscribeToCurrentUser();
  }

  chooseResourceList(): void {
    this.isPersonal = !this.isPersonal;
  }

  deleteResource(resourceId: string, isPersonalList: boolean): void {
    this.showLoading(true);
    this.resourceListApi.deleteResource(resourceId)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(deletedResource => {
        let filteredResourceList;
        if (isPersonalList) {
          filteredResourceList = this.personalResourceList.filter(resource  => resource.id !== deletedResource.id);
        } else {
          filteredResourceList = this.interestedResourceList.filter(resource  => resource.id !== deletedResource.id);
        }
        const newResourceList = isPersonalList ? [
          ...this.interestedResourceList,
          ...filteredResourceList,
          ] : [
          ...this.interestedResourceList,
          ...filteredResourceList,
        ];
        this.currentUserService.setCurrentUser({
          ...this.currentUser,
          resourceList: [
            ...newResourceList,
          ],
        });
      });
  }

  private subscribeToCurrentUser(): void {
    this.currentUserService.getCurrentUser()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(currentUser => {
        this.personalResourceList = currentUser.resourceList.filter(resource => resource?.personal);
        this.interestedResourceList = currentUser.resourceList.filter(resource => !resource?.personal);
        this.currentUser = currentUser;
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
