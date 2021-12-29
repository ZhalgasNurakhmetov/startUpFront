import {Injectable} from "@angular/core";
import {LocalNotifications, NotificationChannel} from "@capacitor/local-notifications";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  chatChannel: NotificationChannel = {
    id: 'chatChannel',
    name: 'chatChannel',
    importance: 5,
    visibility: 1,
  };

  async initializeNotificationChannels() {
    await LocalNotifications.createChannel(this.chatChannel);
    await LocalNotifications.requestPermissions();
  }

  async registerChatAction() {
    await LocalNotifications.registerActionTypes({
      types: [
        {
          id: 'CHAT_MESSAGE',
        },
      ]
    });
  }
}
