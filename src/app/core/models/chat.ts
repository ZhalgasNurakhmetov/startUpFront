import {UserBase} from "./user";

export interface Chat {
  id: string;
  firstUserId: string;
  secondUserId: string;
  firstUserInfo: string;
  secondUserInfo: string;
  firstUserPhoto: string;
  secondUserPhoto: string;
  messages: Message[];
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
