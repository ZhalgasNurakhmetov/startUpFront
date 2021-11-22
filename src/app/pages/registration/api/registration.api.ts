import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegistrationFormModel} from "../form/registration.form.service";
import {Observable} from "rxjs";
import {User} from "../../../core/models/user";
import {environment} from "../../../../environments/environment";

@Injectable()
export class RegistrationApi {

  constructor(
    private http: HttpClient,
  ) { }

  register(userInfo: RegistrationFormModel): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/current_user/registration`, userInfo);
  }
}
