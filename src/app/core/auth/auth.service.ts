import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Token} from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticationState$ = new BehaviorSubject<boolean>(false);

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) { }

  getToken(): Promise<string> {
    return this.storage.get('BOOKBERRY_TOKEN');
  }

  setToken(token: string): Promise<any> {
    return this.storage.set('BOOKBERRY_TOKEN', token)
      .then(() => {
        this.authenticationState$.next(true);
    });
  }

  login(loginData: any): Observable<Token> {
    return this.http.post<Token>(`${environment.apiUrl}/auth`, loginData);
  }

  logout(): Promise<any> {
    return this.storage.remove('BOOKBERRY_TOKEN')
      .then(() => {
        this.authenticationState$.next(false);
    });
  }

  isAuthenticated(): boolean {
    return this.authenticationState$.value;
  }
}