import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegularApiErrorHandler } from './regular-api-error.handler';

export interface ApiErrorHandler {
  prepareRequest(request: HttpRequest<any>): HttpRequest<any>;
  handleError(apiError: HttpErrorResponse): void;
}

@Injectable({
  providedIn: 'root',
})
export class ApiErrorHandlerFactory {
  constructor(
    private regularApiErrorHandler: RegularApiErrorHandler,
  ) {}

  getApiErrorHandler(request: HttpRequest<any>): ApiErrorHandler {
    return this.regularApiErrorHandler;
  }
}
