import { Component } from '@angular/core';
import { CommandQueueDataManagerService } from '@jcachay/command-queue';
import { ServerDataService } from '../mock-data-access/server-data-service';
import {AppConcurrencyToken} from "../command-queue-dm-parts/app-concurrency-token";

@Component({
  selector: 'app-developer-panel',
  templateUrl: './developer-panel.component.html',
  styleUrls: ['./developer-panel.component.scss']
})
export class DeveloperPanelComponent  {

  constructor(private dm : CommandQueueDataManagerService,
    private ds : ServerDataService) { }

  get commandsInQueue():number
  {
    return this.dm.commandsInQueue;
  }

  get serverModelVersion():number
  {
    return this.ds.serverModelVersion;
  }

  get localModelVersion():number
  {
    const casted = this.dm.currentToken as AppConcurrencyToken;

    return casted.version;
  }

  incrementServerModelVersion():void
  {
    this.ds.incrementModelVersion();
  }

}
