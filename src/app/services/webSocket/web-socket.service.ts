import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;

  connectToWebSocket(userId: string): any {
    this.webSocket = new WebSocket(`${environment.webSocketUrl}/ws/${userId}`);
  }

  sendMessage(message: string): void {
    this.webSocket.send(message);
  }

}
