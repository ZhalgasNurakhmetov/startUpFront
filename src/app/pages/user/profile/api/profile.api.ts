import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../../../core/models/user";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class ProfileApi {

  constructor(
    private http: HttpClient,
  ) { }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/user/${id}`);
  }

  follow(userId: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/user/follow/${userId}`, null);
  }

  unfollow(userId: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/user/unfollow/${userId}`, null);
  }
}
