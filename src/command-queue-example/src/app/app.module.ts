import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  JcgCommandQueueModule
} from "@jcachay/command-queue";
import {DeveloperPanelComponent} from "./developer-panel/developer-panel.component";
import {
  DeveloperNotificationsComponent
} from "./notifications/developer-notifications/developer-notifications.component";

import {FormsModule} from "@angular/forms";
import {DeveloperNotificationsService} from "./notifications/developer-notifications.service";
import {ServerDataService} from "./mock-data-access/server-data-service";
import {AppDataManagerProvider} from "./command-queue-dm-parts/app-data-manager-provider";

@NgModule({
  imports:      [ BrowserModule, FormsModule, JcgCommandQueueModule ],
  declarations: [ AppComponent, DeveloperPanelComponent, DeveloperNotificationsComponent ],
  providers: [
    {provide: ServerDataService},
    {provide: DeveloperNotificationsService},
    AppDataManagerProvider
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
