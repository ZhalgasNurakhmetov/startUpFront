import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Mode} from "@ionic/core";

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private currentPlatform$ = new BehaviorSubject<Mode>('ios');

  getPlatform(): Mode {
    return this.currentPlatform$.value;
  }

  setPlatform(platform: Mode): void {
    this.currentPlatform$
      .next(platform);
  }
}
