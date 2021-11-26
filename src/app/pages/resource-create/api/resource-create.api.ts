import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Resource} from "../../../core/models/user";
import {ResourceCreateFormModel} from "../form/resource-create.form.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class ResourceCreateApi {

  constructor(
    private http: HttpClient,
  ) { }

  createResource(resource: ResourceCreateFormModel): Observable<Resource> {
    return this.http.post<Resource>(`${environment.apiUrl}/api/resource/create`, resource);
  }
}
