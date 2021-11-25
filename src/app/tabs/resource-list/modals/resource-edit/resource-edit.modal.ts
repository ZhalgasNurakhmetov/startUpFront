import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ResourceListApi} from "../../api/resource-list.api";
import {ResourceEditFormService} from "./form/resource-edit.form.service";
import {Resource, User} from "../../../../core/models/user";
import {Mode} from "@ionic/core";
import {ModalController} from "@ionic/angular";
import {EntityService} from "../../../../services/entity/entity.service";
import {forEachControlIn} from "ngx-forms-typed";
import {finalize, take} from "rxjs/operators";
import {CurrentUserService} from "../../../../services/current-user/current-user.service";
import {ToasterService} from "../../../../services/toaster/toaster.service";

@Component({
  templateUrl: './resource-edit.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ResourceListApi, ResourceEditFormService]
})
export class ResourceEditModal implements OnInit {
  @Input() resource: Resource;
  @Input() platform: Mode;
  @Input() currentUser: User;

  form = this.resourceEditFormService.initResourceEditForm();
  isLoading: boolean;

  literatureList: string[] = this.entityService.literatureList;
  coverList: string[] = this.entityService.coverList;
  languageList: string[] = this.entityService.languageList;
  compositionList: string[] = this.entityService.compositionList;
  formatList: string[] = this.entityService.formatList;
  conditionList: string[] = this.entityService.conditionList;

  constructor(
    private resourceEditFormService: ResourceEditFormService,
    private modalCtrl: ModalController,
    private entityService: EntityService,
    private cd: ChangeDetectorRef,
    private resourceListApi: ResourceListApi,
    private currentUserService: CurrentUserService,
    private toaster: ToasterService,
  ) { }

  ngOnInit(): void {
    this.form.patchValue({
      ...this.resource,
    });
  }

  update(): void {
    if (this.form.invalid) {
      forEachControlIn(this.form).call('markAsTouched');
      forEachControlIn(this.form).call('updateValueAndValidity');
      return;
    }
    this.showLoading(true);
    this.resourceListApi.editResource(this.form.value, this.resource.id)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(editedResource => {
        const index = this.currentUser.resourceList.findIndex(resource => resource.id === editedResource.id);
        this.currentUser.resourceList.splice(index, 1, editedResource);
        this.currentUserService.setCurrentUser(this.currentUser);
        this.toaster.show('Данные успешно изменены', 'success', this.platform);
        this.dismiss();
      });
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
    this.form.reset();
  }

  trackById(index, option: string): string {
    return option;
  }

  private showLoading(isLoading: boolean): void {
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

}
