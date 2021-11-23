import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProfileEditFormModel} from "../modals/profile-edit/form/profile-edit.form.service";
import {Observable} from "rxjs";
import {User} from "../../../core/models/user";
import {environment} from "../../../../environments/environment";
import {PasswordChangeFormModel} from "../modals/password-change/form/password-change.form.service";

@Injectable()
export class SettingApi {

  constructor(
    private http: HttpClient,
  ) { }

  editProfile(profileInfo: ProfileEditFormModel): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/api/current_user/edit`, profileInfo);
  }

  changePassword(passwordInfo: PasswordChangeFormModel): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/password/change`, passwordInfo);
  }
}
