import {Injectable} from "@angular/core";
import {typedFormGroup, TypedFormGroup} from "ngx-forms-typed";
import {FormControl, Validators} from "@angular/forms";

export interface ResourceEditFormModel {
  personal: boolean;
  title: string;
  author: string;
  image: string;
  year: string;
  pageCount: string;
  literature: string;
  cover: string;
  language: string;
  composition: string;
  format: string;
  description: string;
  condition: string;
}

@Injectable()
export class ResourceEditFormService {

  initResourceEditForm(): TypedFormGroup<ResourceEditFormModel> {
    return typedFormGroup({
      personal: new FormControl(null),
      image: new FormControl(null),
      title: new FormControl(null, [Validators.required, Validators.pattern('^(?!\\s+$).*')]),
      author: new FormControl(null, [Validators.required, Validators.pattern('^(?!\\s+$).*')]),
      year: new FormControl(null, [Validators.maxLength(4), Validators.pattern('^[0-9]*$')]),
      literature: new FormControl(null, [Validators.required]),
      cover: new FormControl(null),
      language: new FormControl(null, [Validators.required]),
      pageCount: new FormControl(null, [Validators.maxLength(4), Validators.pattern('^[0-9]*$')]),
      composition: new FormControl(null, [Validators.required]),
      format: new FormControl(null),
      description: new FormControl(null, [Validators.maxLength(120), Validators.pattern('^(?!\\s+$).*')]),
      condition: new FormControl(null),
    });
  }
}
