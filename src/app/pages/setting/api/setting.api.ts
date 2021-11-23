import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class SettingApi {

  constructor(
    private http: HttpClient,
  ) { }
}
