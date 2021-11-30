import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from "@angular/core";
import { Resource } from "src/app/core/models/user";
import {Mode} from "@ionic/core";


@Component({
  selector: 'user-resource-list',
  templateUrl: './resource-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListComponent {

  @Input() resourceList: Resource[];
  @Input() platform: Mode;

  @Output() onOpenResourceViewModal = new EventEmitter<Resource>();

  constructor() { }

  trackById(index, { id }: Resource): string {
    return id;
  }

}
