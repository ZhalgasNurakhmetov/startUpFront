import {Injectable} from "@angular/core";
import {typedFormGroup, TypedFormGroup} from "ngx-forms-typed";
import {FormControl, Validators} from "@angular/forms";

export interface ChatCreateFormModel {
  firstUserInfo: string;
  secondUserInfo: string;
  firstUserPhotoPath: string;
  secondUserPhotoPath: string;
}

@Injectable()
export class ChatCreateFormService {

  initChatCreateForm(): TypedFormGroup<ChatCreateFormModel> {
    return typedFormGroup({
      firstUserInfo: new FormControl(null, [Validators.required]),
      secondUserInfo: new FormControl(null, [Validators.required]),
      firstUserPhotoPath: new FormControl(null),
      secondUserPhotoPath: new FormControl(null),
    });
  }
}
