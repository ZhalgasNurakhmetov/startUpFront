import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Resource} from "../../../core/models/user";

@Injectable()
export class ResourceListApi {

  constructor(
    private http: HttpClient,
  ) { }

  deleteResource(resourceId: string): Observable<Resource> {
    return this.http.delete<Resource>(`${environment.apiUrl}/api/resource/delete/${resourceId}`);
  }
}
