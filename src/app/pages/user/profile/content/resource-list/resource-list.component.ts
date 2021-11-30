import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import {Resource} from "../../../../../core/models/user";
import {Mode} from "@ionic/core";

@Component({
  selector: 'profile-resource-list',
  templateUrl: './resource-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListComponent {

  @Input() platform: Mode;
  @Input() userName: string;
  @Input() isPersonal: boolean;
  @Input() resourceList: Resource[];

  @Output() onNavigateToUserResourceListPage = new EventEmitter<void>();

  constructor() { }

  trackById(index, { id }: Resource): string {
    return id;
  }

}
