import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import {UserBase} from "../../../core/models/user";
import {Mode} from "@ionic/core";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent {

  @Input() contactList: UserBase[];
  @Input() platform: Mode;

  @Output() onNavigateToUserPage = new EventEmitter<string>();

  apiUrl = environment.apiUrl;

  constructor() { }

  trackById(index, { id }: UserBase): string {
    return id;
  }

}
