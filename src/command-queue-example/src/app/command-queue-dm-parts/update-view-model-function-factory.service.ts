import { Injectable } from "@angular/core";
import { CommandQueueCommand, CommandQueueUpdateViewModelFunctionFactoryService, IUpdateViewModelFunction } from "@jcachay/command-queue";
import { AddPetCommand } from "./commands/add-pet-command";
import { PetsViewModel } from "./pets-view-model";


/*
* The command-queue library uses this class to create a 
* function to apply the command to the ViewModel, updating its state
*/

@Injectable({
  providedIn:'root'
})
export class UpdateViewModelFunctionFactoryService
extends CommandQueueUpdateViewModelFunctionFactoryService
{

create(cmd: CommandQueueCommand): IUpdateViewModelFunction {
  if (cmd instanceof AddPetCommand)
  {
    return this.handle_AddPet(cmd);
  }
   // This can only occur if the developer forgot to implement the handling for a command
   throw new Error('No handler found for the command');
}

private handle_AddPet(cmd: AddPetCommand) : IUpdateViewModelFunction
{
    return (vm)=>{
     const cast = vm as PetsViewModel;
     cast.pets.push({
       id: cmd.id,
       name: cmd.name
     });
    }
}

}