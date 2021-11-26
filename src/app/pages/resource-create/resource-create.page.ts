import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {ResourceCreateFormService} from "./form/resource-create.form.service";
import {EntityService} from "../../services/entity/entity.service";
import {forEachControlIn} from "ngx-forms-typed";
import {ResourceCreateApi} from "./api/resource-create.api";
import {finalize, take, takeUntil} from "rxjs/operators";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {Subject} from "rxjs";
import {User} from "../../core/models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";
import {TabRoutes} from "../../tabs/tab.routes";
import {ToasterService} from "../../services/toaster/toaster.service";

@Component({
  templateUrl: './resource-create.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCreatePage implements OnInit, OnDestroy {

  form = this.resourceCreateFormService.initResourceCreateFormService();
  currentUser: User;

  platform: Mode;
  isLoading: boolean;

  literatureList: string[] = this.entityService.literatureList;
  coverList: string[] = this.entityService.coverList;
  languageList: string[] = this.entityService.languageList;
  compositionList: string[] = this.entityService.compositionList;
  formatList: string[] = this.entityService.formatList;
  conditionList: string[] = this.entityService.conditionList;

  private unsubscribe$ = new Subject();

  constructor(
    private resourceCreateFormService: ResourceCreateFormService,
    private platformService: PlatformService,
    private entityService: EntityService,
    private resourceCreateApi: ResourceCreateApi,
    private currentUserService: CurrentUserService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.form.controls.personal.setValue(this.route.snapshot.params.isPersonal);
    this.subscribeToCurrentUser();
  }

  create(): void {
    if (this.form.invalid) {
      forEachControlIn(this.form).call('markAsTouched');
      forEachControlIn(this.form).call('updateValueAndValidity');
      return;
    }
    this.showLoading(true);
    this.resourceCreateApi.createResource(this.form.value)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(resource => {
        this.currentUserService.setCurrentUser({
          ...this.currentUser,
          resourceList: [
            ...this.currentUser.resourceList,
            resource
          ],
        });
        this.toaster.show('Ресурс успешно добавлен', 'success', this.platform);
        this.router.navigate([AppRoutes.tabs, TabRoutes.addResource]);
      });
  }

  trackById(index, option: string): string {
    return option;
  }

  private subscribeToCurrentUser(): void {
    this.currentUserService.getCurrentUser()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(currentUser => {
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
