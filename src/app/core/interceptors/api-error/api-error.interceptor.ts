import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ApiErrorHandler, ApiErrorHandlerFactory} from '../../error-handlers/api-error-handler';
import {ServerSideErrorStatusEnum} from '../../error-handlers/api-error-handler';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(
    private apiErrorHandlerFactory: ApiErrorHandlerFactory,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiErrorHandler: ApiErrorHandler = this.apiErrorHandlerFactory.getApiErrorHandler(request);
    request = apiErrorHandler.prepareRequest(request);
    return next.handle(request).pipe(
      catchError((apiError: HttpErrorResponse) => {
        if (apiError.status !== ServerSideErrorStatusEnum.ISSUE) {
          apiErrorHandler.handleError(apiError);
        }
        return throwError(apiError);
      })
    );
  }
}
