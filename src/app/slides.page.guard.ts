import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import {SingleTimeService} from "./services/single-time/single-time.service";

@Injectable({
  providedIn: 'root'
})
export class SlidesPageGuard implements CanActivate{

  constructor(
    private singleTimeService: SingleTimeService,
  ) {
  }

  // TODO required to check on device after reopening app

  canActivate(): boolean {
    return !this.singleTimeService.getCurrentIsNotFirstTimeState();
  }

}
