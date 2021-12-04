import {Injectable} from "@angular/core";
import {typedFormGroup, TypedFormGroup} from "ngx-forms-typed";
import {FormControl, Validators} from "@angular/forms";

export interface MessageFormModel {
  chatId: string;
  userId: string;
  message: string;
  isRed: boolean;
  dateTime: string;
  contactId: string;
}

@Injectable()
export class MessageFormService {
  initMessageForm(): TypedFormGroup<MessageFormModel> {
    return typedFormGroup({
      chatId: new FormControl(null, [Validators.required]),
      userId: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
      isRed: new FormControl(null, [Validators.required]),
      dateTime: new FormControl(null, [Validators.required]),
      contactId: new FormControl(null, [Validators.required]),
    });
  }
}
