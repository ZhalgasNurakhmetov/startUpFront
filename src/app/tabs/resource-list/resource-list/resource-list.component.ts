import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import {Resource} from "../../../core/models/user";
import {Mode} from "@ionic/core";

@Component({
  selector: 'resource-list',
  templateUrl: './resource-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceListComponent {

  @Input() resourceList: Resource[];
  @Input() platform: Mode;

  @Output() onDeleteResource = new EventEmitter<string>();

  constructor() { }

}
