import {Injectable} from "@angular/core";
import {typedFormGroup, TypedFormGroup} from "ngx-forms-typed";
import {FormControl, Validators} from "@angular/forms";

export interface ProfileEditFormModel {
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  about: string;
}

@Injectable()
export class ProfileEditFormService {
  initProfileEditForm(): TypedFormGroup<ProfileEditFormModel> {
    return typedFormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('^(?!\\s+$).*')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('^(?!\\s+$).*')]),
      birthDate: new FormControl(null, [Validators.required]),
      about: new FormControl(null, [Validators.maxLength(120), Validators.pattern('^(?!\\s+$).*')]),
      city: new  FormControl(null, [Validators.required]),
    });
  }
}
