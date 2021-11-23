import {Injectable} from "@angular/core";
import {typedFormGroup, TypedFormGroup} from "ngx-forms-typed";
import {FormControl, Validators} from "@angular/forms";

export interface PasswordChangeFormModel {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

@Injectable()
export class PasswordChangeFormService {

  initPasswordChangeForm(): TypedFormGroup<PasswordChangeFormModel> {
    return typedFormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      newPasswordConfirm: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    });
  }
}
