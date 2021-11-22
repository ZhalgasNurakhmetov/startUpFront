import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PasswordRestoreFormModel} from "../form/password-restore.form.service";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class PasswordRestoreApi {

  constructor(
    private http: HttpClient,
  ) { }

  restorePassword(username: PasswordRestoreFormModel): Observable<null> {
    return this.http.post<null>(`${environment.apiUrl}/api/password/reset`, username);
  }

}
