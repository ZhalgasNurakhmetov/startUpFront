import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";
import {UserLike} from "../../core/models/user";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {ModalService} from "../../services/modal/modal.service";
import {ResourceViewModal} from "./modals/resource-view/resource-view.modal";

@Component({
  templateUrl: './favorite-resource.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteResourcePage implements OnInit {

  platform: Mode;
  resourceList: UserLike[];

  constructor(
    private platformService: PlatformService,
    private currentUserService: CurrentUserService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.resourceList = this.currentUserService.getCurrentUser().likedResourceList;
  }

  trackById(index, { id }: UserLike): string {
    return id;
  }

  openResourceViewModal(resource: UserLike): void {
    this.modalService.open(ResourceViewModal, this.platform, {resource: resource.resource, platform: this.platform});
  }

}
