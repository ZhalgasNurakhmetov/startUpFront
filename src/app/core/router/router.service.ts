import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(
    private storage: Storage,
  ) { }

  getLastRoutePath(): Promise<string> {
    return this.storage.get('BOOKBERRY_ROUTE_PATH');
  }

  setRoutePath(path: string): Promise<any> {
    return this.storage.set('BOOKBERRY_ROUTE_PATH', path);
  }
}
