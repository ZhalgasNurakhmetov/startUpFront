import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable()
export class FavoriteResourceApi {

  constructor(
    private http: HttpClient,
  ) { }

  unlikeResource(userId: string, resourceId: string): Observable<null> {
    return this.http.delete<null>(`${environment.apiUrl}/api/user/${userId}/unlike/${resourceId}`);
  }
}
