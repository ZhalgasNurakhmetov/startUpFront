import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {User} from "../../core/models/user";

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {

  private currentUser$ = new BehaviorSubject<User>(null);

  getCurrentUser(): User {
    return this.currentUser$.value;
  }

  setCurrentUser(user: User): void {
    this.currentUser$
      .next(user);
  }
}
