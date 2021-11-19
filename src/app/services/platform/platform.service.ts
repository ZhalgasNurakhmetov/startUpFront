import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private currentPlatform$ = new BehaviorSubject('native');

  getPlatform(): Observable<any> {
    return this.currentPlatform$;
  }

  setPlatform(platform: string) {
    this.currentPlatform$
      .next(platform);
  }
}
