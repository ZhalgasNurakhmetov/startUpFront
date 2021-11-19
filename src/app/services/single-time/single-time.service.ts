import {Injectable} from "@angular/core";
import {BehaviorSubject, from, Observable} from "rxjs";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class SingleTimeService {

  private isNotFirstTime$ = new BehaviorSubject<boolean>(false);

  constructor(
    private storage: Storage,
  ) { }

  getIsNotFirstTime(): Observable<boolean> {
    return from(this.storage.get('IS_NOT_FIRST_TIME'));
  }

  setIsNotFirstTime(): void {
    this.storage.set('IS_NOT_FIRST_TIME', true)
      .then(() => {
        this.isNotFirstTime$
          .next(true);
      });
  }

  getCurrentIsNotFirstTimeState(): boolean {
    return this.isNotFirstTime$.value;
  }
}
