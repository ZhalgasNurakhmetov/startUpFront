import {Injectable} from "@angular/core";
import {typedFormGroup, TypedFormGroup} from "ngx-forms-typed";
import {FormControl, Validators} from "@angular/forms";

export interface PasswordRestoreFormModel {
  username: string;
}

@Injectable()
export class PasswordRestoreFormService {

  initPasswordRestoreForm(): TypedFormGroup<PasswordRestoreFormModel> {
    return typedFormGroup({
      username: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    });
  }
}
