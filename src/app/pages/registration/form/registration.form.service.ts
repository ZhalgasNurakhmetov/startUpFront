import {Injectable} from "@angular/core";
import {typedFormGroup, TypedFormGroup} from "ngx-forms-typed";
import {FormControl, Validators} from "@angular/forms";

export interface RegistrationFormModel {
  firstName: string;
  lastName: string;
  username: string;
  birthDate: string;
  city: string;
  password: string;
}

@Injectable()
export class RegistrationFormService {

  initRegistrationForm(): TypedFormGroup<RegistrationFormModel> {
    return typedFormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('^(?!\\s+$).*')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('^(?!\\s+$).*')]),
      birthDate: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?!\\s+$).*')]),
      city: new FormControl(null, [Validators.required]),
    });
  }
}
