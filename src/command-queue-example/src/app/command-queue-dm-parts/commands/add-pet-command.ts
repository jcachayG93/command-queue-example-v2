import { CommandQueueCommand } from "@jcachay/command-queue";

/*
* The command-queue library works with commands that
* extend the CommandQueueCommand class. This class
* does not have any members.
*/

export class AddPetCommand
extends CommandQueueCommand
{
    constructor(id:string, name:string)
    {
      super();
      this.id = id;
      this.name = name;
    }
    id: string;
    name: string;
}