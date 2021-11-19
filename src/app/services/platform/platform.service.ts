import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  private currentPlatform$ = new BehaviorSubject<string>('native');

  getPlatform(): Observable<string> {
    return this.currentPlatform$;
  }

  setPlatform(platform: string): void {
    this.currentPlatform$
      .next(platform);
  }
}
