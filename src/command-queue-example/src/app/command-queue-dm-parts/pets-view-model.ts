import { CommandQueueViewModel } from "@jcachay/command-queue/public-api";


/*
* To work with the command-queue library, the view model must implement
* the CommandQueueViewModel interface
*/

export interface PetsViewModel 
extends CommandQueueViewModel
{
version: number;
pets : Pet[]
}

export interface Pet
{
  id : string;
  name : string;
}

