import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Resource, UserLike} from "../../../core/models/user";

@Injectable()
export class UserApi {

  constructor(
    private http: HttpClient,
  ) { }

  addToFavorite(userId: string, resourceId: string): Observable<{resource: Resource; favorite: UserLike}> {
    return this.http.post<{resource: Resource, favorite: UserLike}>(`${environment.apiUrl}/api/user/${userId}/like/${resourceId}`, null);
  }

  removeFavorite(userId: string, resourceId: string): Observable<{resource: Resource; favorite: UserLike}> {
    return this.http.delete<{resource: Resource, favorite: UserLike}>(`${environment.apiUrl}/api/user/${userId}/unlike/${resourceId}`);
  }
}
