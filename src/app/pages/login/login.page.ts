import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'layout'
  }
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
