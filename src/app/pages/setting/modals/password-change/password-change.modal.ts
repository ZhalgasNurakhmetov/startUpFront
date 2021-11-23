import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './password-change.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordChangeModal implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
