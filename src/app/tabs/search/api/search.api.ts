import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Resource} from "../../../core/models/user";
import {environment} from "../../../../environments/environment";
import {SearchFilterFormModel} from "../form/search-filter.form.service";

@Injectable()
export class SearchApi {

  constructor(
    private http: HttpClient,
  ) { }

  searchResource(searchText: string, filter: SearchFilterFormModel): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${environment.apiUrl}/api/resource/search`, {
      params: {
        searchText,
        criteria: filter.author ? 'author' : 'title',
        literature: filter.literature || '',
        language: filter.language || '',
        composition: filter.composition || '',
      }
    });
  }
}
