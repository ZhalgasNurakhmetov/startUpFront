import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../../services/platform/platform.service";
import {UserService} from "../../../services/user/user.service";
import {Subject} from "rxjs";
import {Resource} from "../../../core/models/user";
import {takeUntil} from "rxjs/operators";

@Component({
  templateUrl: './resource-list.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListPage implements OnInit, OnDestroy {

  platform: Mode;
  personalResourceList: Resource[];
  interestedResourceList: Resource[];
  isPersonal = true;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.subscribeToUser();
  }

  chooseResourceList(): void {
    this.isPersonal = !this.isPersonal;
  }

  private subscribeToUser(): void {
    this.userService.getUser()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(currentUser => {
        this.personalResourceList = currentUser.resourceList.filter(resource => resource?.personal);
        this.interestedResourceList = currentUser.resourceList.filter(resource => !resource?.personal);
        this.cd.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
