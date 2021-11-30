import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserApi {

  constructor(
    private http: HttpClient,
  ) { }
}
