import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;
  readMessageWebsocket: WebSocket;

  connectToWebSocket(userId: string): void {
    this.webSocket = new WebSocket(`${environment.webSocketUrl}/ws/${userId}`);
    this.readMessageWebsocket = new WebSocket(`${environment.webSocketUrl}/ws/read_message`);
  }

  sendMessage(message: string): void {
    this.webSocket.send(message);
  }

  readMessage(reading: string) {
    this.readMessageWebsocket.send(reading);
  }

}
