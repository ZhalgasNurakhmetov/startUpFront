import {from, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CredentialsInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.authService.getToken())
      .pipe(
        switchMap(token => {
          if (token) {
            request = request.clone({
              headers: request.headers
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
            });
          }
          return next.handle(request);
        })
      );
  }

}
