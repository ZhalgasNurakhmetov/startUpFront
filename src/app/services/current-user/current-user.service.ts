import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../core/models/user";

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {

  private currentUser$ = new BehaviorSubject<User>(null);

  getCurrentUser(): Observable<User> {
    return this.currentUser$;
  }

  getCurrentUserId(): string {
    return this.currentUser$.value.id;
  }

  setCurrentUser(user: User): void {
    this.currentUser$
      .next(user);
  }

  getCurrentUserValue(): User {
    return this.currentUser$.value;
  }
}
