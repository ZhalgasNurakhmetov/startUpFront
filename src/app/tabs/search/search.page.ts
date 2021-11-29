import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {FormControl} from "@angular/forms";
import {of, Subject} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil} from "rxjs/operators";
import {SearchApi} from "./api/search.api";
import {Resource} from "../../core/models/user";
import {SearchFilterFormService} from "./form/search-filter.form.service";
import {ModalService} from "../../services/modal/modal.service";
import {FilterModal} from "./modals/filter/filter.modal";
import {Router} from "@angular/router";
import {AppRoutes} from "../../app.routes";
import {UserRoutes} from "../../pages/user/user.routes";

@Component({
  templateUrl: './search.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage implements OnInit, OnDestroy {

  platform: Mode;
  searchControl = new FormControl('');
  isLoading: boolean;
  resourceList: Resource[];
  form = this.searchFilterFormService.form;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private searchApi: SearchApi,
    private cd: ChangeDetectorRef,
    private searchFilterFormService: SearchFilterFormService,
    private modalService: ModalService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.subscribeToSearchControl();
  }

  trackById(index, { id }: Resource) {
    return id;
  }

  openSearchFilterModal(): void {
    this.modalService.open(FilterModal, this.platform, {platform: this.platform, form: this.form});
  }

  navigateToUserPage(id: string): void {
    this.router.navigate([AppRoutes.user, UserRoutes.profile, id]);
  }

  private subscribeToSearchControl() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchValue => {
          this.showLoading(true);
          if (searchValue === '') {
            return of(null);
          }
          return this.searchApi.searchResource(searchValue, this.form.value);
        }),
        catchError(() => of(null))
      )
      .subscribe(resourceList => {
        this.resourceList = resourceList;
        this.showLoading(false);
      });
  }

  private showLoading(value: boolean) {
    this.isLoading = value;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
