import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Resource} from "../../../core/models/user";
import {ResourceEditFormModel} from "../modals/resource-edit/form/resource-edit.form.service";

@Injectable()
export class ResourceListApi {

  constructor(
    private http: HttpClient,
  ) { }

  deleteResource(resourceId: string): Observable<Resource> {
    return this.http.delete<Resource>(`${environment.apiUrl}/api/resource/delete/${resourceId}`);
  }

  setAvailability(resourceId: string): Observable<Resource> {
    return this.http.put<Resource>(`${environment.apiUrl}/api/resource/${resourceId}/available`, null);
  }

  editResource(resourceInfo: ResourceEditFormModel, resourceId: string): Observable<Resource> {
    return this.http.put<Resource>(`${environment.apiUrl}/api/resource/edit/${resourceId}`, resourceInfo);
  }

  uploadImage(resourceId: string, formData: FormData): Observable<Resource> {
    return this.http.post<Resource>(`${environment.apiUrl}/api/image/upload/${resourceId}`, formData);
  }
}
