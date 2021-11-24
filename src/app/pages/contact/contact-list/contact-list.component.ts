import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {UserBase} from "../../../core/models/user";
import {Mode} from "@ionic/core";

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent implements OnInit {

  @Input() contactList: UserBase[];
  @Input() platform: Mode;

  constructor() { }

  ngOnInit(): void {
  }

}
