import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { DeveloperNotification } from './developer-notifications/notification';

@Injectable()
export class DeveloperNotificationsService {
  constructor() {}

  notify(message: string, danger = false) {
    const notification: DeveloperNotification = {
      id: uuid(),
      message: message,
      danger: danger
    };
    this._messages.push(notification);
  }

  get messages(): DeveloperNotification[] {
    return this._messages;
  }

  removeMessage(id:string)
  {
    this._messages = this._messages.filter(m=>m.id != id);
  }

  private _messages: DeveloperNotification[] = [];
}
