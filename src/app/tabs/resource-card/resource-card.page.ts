import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PlatformService} from "../../services/platform/platform.service";
import {Router} from "@angular/router";
import {Mode} from "@ionic/core";
import {AppRoutes} from "../../app.routes";

@Component({
  templateUrl: './resource-card.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceCardPage implements OnInit {

  platform: Mode;

  constructor(
    private platformService: PlatformService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
  }

  navigateToResourceCreate(isPersonal: boolean): void {
    this.router.navigate([AppRoutes.resourceCreate, isPersonal]);
  }

}
