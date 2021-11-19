import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ApiErrorInterceptor, CredentialsInterceptor} from './interceptors';
import {IonicModule} from '@ionic/angular';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
      ],
    };
  }
}
