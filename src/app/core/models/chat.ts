import {UserBase} from "./user";

export interface Chat {
  id: string;
  firstUserId: string;
  secondUserId: string;
  firstUserInfo: string;
  secondUserInfo: string;
  firstUserPhotoPath: string;
  secondUserPhotoPath: string;
  messages: Message[];
  unreadMessages?: number;
}

export interface Message {
  id: string;
  chatId: string;
  userId: string;
  userInfo: UserBase;
  message: string;
  isRed: boolean;
  dateTime: string;
}
