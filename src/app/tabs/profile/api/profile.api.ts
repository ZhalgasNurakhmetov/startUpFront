import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../core/models/user";
import {environment} from "../../../../environments/environment";

@Injectable()
export class ProfileApi {

  constructor(
    private http: HttpClient,
  ) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/current_user/me`);
  }
}
