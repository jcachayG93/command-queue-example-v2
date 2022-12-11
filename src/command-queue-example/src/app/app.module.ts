import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  commandQueueDataManagerProvider,
  CommandQueueDataService, CommandQueueUpdateViewModelFunctionFactoryService,
  CommandQueueViewModelReaderService, JcgCommandQueueModule
} from "@jcachay/command-queue";
import {DeveloperPanelComponent} from "./developer-panel/developer-panel.component";
import {
  DeveloperNotificationsComponent
} from "./notifications/developer-notifications/developer-notifications.component";
import {
  UpdateViewModelFunctionFactoryService
} from "./command-queue-dm-parts/update-view-model-function-factory.service";
import {PetsDataService} from "./command-queue-dm-parts/pets-data.service";
import {FormsModule} from "@angular/forms";
import {ViewModelReaderService} from "./command-queue-dm-parts/view-model-reader.service";
import {DeveloperNotificationsService} from "./notifications/developer-notifications.service";

@NgModule({
  imports:      [ BrowserModule, FormsModule, JcgCommandQueueModule ],
  declarations: [ AppComponent, DeveloperPanelComponent, DeveloperNotificationsComponent ],
  providers: [
    {provide: CommandQueueDataService, useClass: PetsDataService},
    {provide: CommandQueueUpdateViewModelFunctionFactoryService,
      useClass: UpdateViewModelFunctionFactoryService},
    {provide: CommandQueueViewModelReaderService, useClass: ViewModelReaderService},
    {provide: CommandQueueDataService, useClass: PetsDataService},
    commandQueueDataManagerProvider,
    {provide: DeveloperNotificationsService}
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
