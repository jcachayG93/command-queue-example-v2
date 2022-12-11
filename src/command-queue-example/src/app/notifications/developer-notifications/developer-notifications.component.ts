import { Component, OnInit } from '@angular/core';
import { DeveloperNotificationsService } from '../developer-notifications.service';
import { DeveloperNotification } from './notification';

@Component({
  selector: 'app-developer-notifications',
  templateUrl: './developer-notifications.component.html',
  styleUrls: ['./developer-notifications.component.scss']
})
export class DeveloperNotificationsComponent  {

  constructor(private notificationsService : DeveloperNotificationsService) { }

  get notifications():DeveloperNotification[]
  {
    return this.notificationsService.messages;
  }

  discardNotification(id:string):void
  {
    this.notificationsService.removeMessage(id);
  }

}