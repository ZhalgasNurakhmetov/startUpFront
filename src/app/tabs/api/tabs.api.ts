import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../core/models/user";
import {environment} from "../../../environments/environment";
import {Chat} from "../../core/models/chat";

@Injectable()
export class TabsApi {

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/current_user/me`);
  }

  getChatList(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${environment.apiUrl}/api/chat/list`);
  }
}
