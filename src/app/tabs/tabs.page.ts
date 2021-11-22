import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Mode} from "@ionic/core";
import {PlatformService} from "../services/platform/platform.service";

@Component({
  templateUrl: 'tabs.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPage implements OnInit{

  platform: Mode;

  constructor(
    private platformService: PlatformService,
  ) {}

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
  }

}
