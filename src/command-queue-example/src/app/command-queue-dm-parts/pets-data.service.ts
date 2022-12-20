
import {CommandQueueCommand, CommandQueueDataService, ConcurrencyToken} from "@jcachay/command-queue";
import {map, Observable} from "rxjs";
import { ServerDataService } from "../mock-data-access/server-data-service";
import { AddPetCommand } from "./commands/add-pet-command";
import {AppConcurrencyToken} from "./app-concurrency-token";

/*
* The command-queue library uses this class to write data to
* the server.
*/


export class PetsDataService
extends CommandQueueDataService
{

constructor(private ds : ServerDataService)
{
  super();
}

  execute(token:ConcurrencyToken, cmd: CommandQueueCommand): Observable<ConcurrencyToken> {

  if (cmd instanceof AddPetCommand)
  {
    return this.handle_AddPet(token, cmd);
  }
  // This can only occur if the developer forgot to implement the handling for a command
  throw new Error('No handler found for the command');
}

private handle_AddPet(token: ConcurrencyToken, cmd : AddPetCommand) : Observable<ConcurrencyToken>
{
  const casted = token as AppConcurrencyToken;
  return this.ds.addPet(casted.version, cmd.id, cmd.name)
    .pipe(map(v=>new AppConcurrencyToken(v)));
}

}
