import {Injectable} from "@angular/core";
import {typedFormGroup, TypedFormGroup} from "ngx-forms-typed";
import {FormControl} from "@angular/forms";

export interface SearchFilterFormModel {
  author: string;
  literature: string;
  language: string;
  composition: string;
}

@Injectable()
export class SearchFilterFormService {

  form = this.initSearchFilterForm();

  initSearchFilterForm(): TypedFormGroup<SearchFilterFormModel> {
    return typedFormGroup({
      author: new FormControl(null),
      literature: new FormControl(null),
      language: new FormControl(null),
      composition: new FormControl(null),
    });
  }
}
