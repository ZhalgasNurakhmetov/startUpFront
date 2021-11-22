import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from "../../core/models/user";
import {CurrentUserService} from "../../services/current-user/current-user.service";
import {Mode} from "@ionic/core";
import {PlatformService} from "../../services/platform/platform.service";

@Component({
  templateUrl: './profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {

  currentUser: User;
  platform: Mode;

  constructor(
    private currentUserService: CurrentUserService,
    private platformService: PlatformService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.currentUserService.getCurrentUser();
    this.platform = this.platformService.getPlatform();
  }

}
