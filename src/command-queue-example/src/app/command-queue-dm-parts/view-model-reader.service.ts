import { Injectable } from "@angular/core";
import {
  CommandQueueReaderResponseDto,
  CommandQueueViewModel,
  CommandQueueViewModelReader
} from "@jcachay/command-queue";
import {map, Observable} from "rxjs";
import { ServerDataService } from "../mock-data-access/server-data-service";
import {AppConcurrencyToken} from "./app-concurrency-token";

/*
* The command-queue library uses this class to read the data from
* the server
*/

@Injectable({
  providedIn:'root'
})
export class ViewModelReader
extends CommandQueueViewModelReader
{

  constructor(private ds : ServerDataService)
  {
    super();
  }

read(): Observable<CommandQueueReaderResponseDto> {

  return this.ds.getPets().pipe(map(vm=>
    new CommandQueueReaderResponseDto(
      vm,
      new AppConcurrencyToken(vm.version)
    )));
}

}
