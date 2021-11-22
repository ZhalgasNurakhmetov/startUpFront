import {Injectable} from "@angular/core";
import {from, Observable} from "rxjs";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class SingleTimeService {

  constructor(
    private storage: Storage,
  ) { }

  getIsNotFirstTime(): Observable<boolean> {
    return from(this.storage.get('IS_NOT_FIRST_TIME'));
  }

  setIsNotFirstTime(): void {
    this.storage.set('IS_NOT_FIRST_TIME', true)
  }

}
