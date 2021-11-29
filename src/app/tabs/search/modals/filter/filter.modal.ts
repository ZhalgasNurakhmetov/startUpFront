import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Mode} from "@ionic/core";
import {ModalController} from "@ionic/angular";
import {SearchFilterFormModel, SearchFilterFormService} from "../../form/search-filter.form.service";
import {FormControl} from "@angular/forms";
import {EntityService} from "../../../../services/entity/entity.service";
import {TypedFormGroup} from "ngx-forms-typed";

@Component({
  templateUrl: './filter.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchFilterFormService]
})
export class FilterModal {

  @Input() platform: Mode;
  @Input() form: TypedFormGroup<SearchFilterFormModel>;

  literatureList = this.entityService.literatureList;
  languageList = this.entityService.languageList;
  compositionList = this.entityService.compositionList;

  constructor(
    private modalCtrl: ModalController,
    private searchFilterFormService: SearchFilterFormService,
    private entityService: EntityService,
  ) { }

  dropFilters(): void {
    this.form.reset();
  }

  dismiss(): void {
    this.modalCtrl.dismiss();
  }

  removeFilter(control: FormControl): void {
    control.setValue(null);
  }

  trackById(index, option: string): string {
    return option;
  }

}
