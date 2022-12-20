import { Component } from '@angular/core';
import { ServerDataService } from '../mock-data-access/server-data-service';
import {AppConcurrencyToken} from "../command-queue-dm-parts/app-concurrency-token";
import {AppDataManagerService} from "../command-queue-dm-parts/app-data-manager.service";

@Component({
  selector: 'app-developer-panel',
  templateUrl: './developer-panel.component.html',
  styleUrls: ['./developer-panel.component.scss']
})
export class DeveloperPanelComponent  {

  constructor(private dm : AppDataManagerService,
    private ds : ServerDataService) { }

  get commandsInQueue():number
  {
    return this.dm.pendingCommands.length;
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

  cancelCommands()
  {
    this.dm.cancelAllCommands();
  }

}
