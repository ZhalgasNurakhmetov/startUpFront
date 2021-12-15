import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Mode} from "@ionic/core";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private currentPlatform$ = new BehaviorSubject<Mode>('ios');

  constructor(
    private storage: Storage,
  ) { }

  getPlatform(): Mode {
    return this.currentPlatform$.value;
  }

  setPlatform(platform: Mode): void {
    this.currentPlatform$
      .next(platform);
  }

  getLastRoutePath(): Promise<string> {
    return this.storage.get('LAST_ROUTE_PATH');
  }

  setRoutePath(path: string): void {
    this.storage.set('LAST_ROUTE_PATH', path);
  }
}
