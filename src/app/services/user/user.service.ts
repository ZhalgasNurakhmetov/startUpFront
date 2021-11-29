import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../core/models/user";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private user$ = new BehaviorSubject<User>(null);

  getUser(): Observable<User> {
    return this.user$;
  }

  setUser(user: User): void {
    this.user$
      .next(user);
  }
}
