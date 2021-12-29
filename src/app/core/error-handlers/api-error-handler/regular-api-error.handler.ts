import {HttpErrorResponse, HttpRequest} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {ApiErrorHandler} from './api-error.handler.factory';
import {ServerSideErrorStatusEnum} from './server-side-error-status.enum';
import {AuthService} from '../../auth/auth.service';
import {PlatformService} from "../../../services/platform/platform.service";
import {ToasterService} from "../../../services/toaster/toaster.service";


@Injectable({
  providedIn: 'root',
})
export class RegularApiErrorHandler implements ApiErrorHandler {

  constructor(
    private toaster: ToasterService,
    private ngZone: NgZone,
    private authService: AuthService,
    private platformService: PlatformService,
  ) {}

  prepareRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request;
  }

  handleError(apiError: HttpErrorResponse): void {
    if (apiError instanceof HttpErrorResponse) {
      switch (apiError.status) {
        case ServerSideErrorStatusEnum.BAD_REQUEST: {
          console.error('BAD REQUEST', apiError);
          const error = apiError.error;
          this.ngZone.run(() => this.toaster.show(error.detail, 'danger', this.platformService.getPlatform()));
          break;
        }
        case ServerSideErrorStatusEnum.UNAUTHORIZED: {
          console.error('UNAUTHORIZED', apiError);
          const error = apiError.error;
          this.ngZone.run(() => this.toaster.show(error.detail, 'danger', this.platformService.getPlatform()));
          break;
        }
        case ServerSideErrorStatusEnum.USER_NOT_EXIST: {
          console.error('USER_NOT_EXIST', apiError);
          const error = apiError.error;
          this.ngZone.run(() => this.toaster.show(error.detail, 'danger', this.platformService.getPlatform()));
          this.authService.logout();
          break;
        }
        case ServerSideErrorStatusEnum.NOT_FOUND: {
          console.error('NOT_FOUND', apiError);
          this.ngZone.run(() =>
            this.toaster.show(apiError.error.detail, 'danger', this.platformService.getPlatform())
          );
          break;
        }
        case ServerSideErrorStatusEnum.NOT_ACCEPTABLE: {
          console.error('NOT_FOUND', apiError);
          this.ngZone.run(() =>
            this.toaster.show(apiError.error.detail, 'danger', this.platformService.getPlatform())
          );
          break;
        }
        case ServerSideErrorStatusEnum.FORBIDDEN: {
          console.error('FORBIDDEN', apiError);
          this.ngZone.run(() =>
            this.toaster.show(apiError.error.detail, 'danger', this.platformService.getPlatform())
          );
          break;
        }
        case ServerSideErrorStatusEnum.INTERNAL_SERVER_ERROR: {
          console.error('INTERNAL_SERVER_ERROR', apiError);
          this.ngZone.run(() =>
            this.toaster.show('К сожалению, функционал недоступен по техническим причинам', 'danger', this.platformService.getPlatform())
          );
          break;
        }
        case ServerSideErrorStatusEnum.ALREADY_EXIST_ERROR: {
          console.error('ALREADY_EXIST_ERROR', apiError);
          this.ngZone.run(() =>
            this.toaster.show(apiError.error.detail, 'danger', this.platformService.getPlatform())
          );
          break;
        }
        case ServerSideErrorStatusEnum.BAD_GATEWAY: {
          console.error('BAD_GATEWAY', apiError);
          this.ngZone.run(() =>
            this.toaster.show('К сожалению, сервер недоступен. Возможно из-за проблем с соединением', 'danger', this.platformService.getPlatform())
          );
          break;
        }
        case ServerSideErrorStatusEnum.SERVICE_UNAVAILABLE: {
          console.error('SERVICE_UNAVAILABLE', apiError);
          this.ngZone.run(() =>
            this.toaster.show('К сожалению, сервер недоступен по техническим причинам', 'danger', this.platformService.getPlatform())
          );
          break;
        }
        case ServerSideErrorStatusEnum.GATEWAY_TIMEOUT: {
          console.error('GATEWAY_TIMEOUT', apiError);
          this.ngZone.run(() =>
            this.toaster.show('К сожалению, сервер недоступен. Возможно из-за проблем с соединением', 'danger', this.platformService.getPlatform())
          );
          break;
        }
        default: {
          console.error('UNDEFINED ERROR', apiError);
          this.ngZone.run(() =>
            this.toaster.show('Техническая ошибка', 'danger', this.platformService.getPlatform())
          );
          break;
        }
      }
    }
  }
}
