import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable()
export class FavoriteResourceApi {

  constructor(
    private http: HttpClient,
  ) { }

  likeResource(userId: string, resourceId: string): Observable<null> {
    return this.http.post<null>(`${environment.apiUrl}/api/user/${userId}/like/${resourceId}`, null);
  }

  unlikeResource(userId: string, resourceId: string): Observable<null> {
    return this.http.post<null>(`${environment.apiUrl}/api/user/${userId}/unlike/${resourceId}`, null);
  }
}
