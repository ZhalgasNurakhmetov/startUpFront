import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './profile-edit.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileEditModal implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
