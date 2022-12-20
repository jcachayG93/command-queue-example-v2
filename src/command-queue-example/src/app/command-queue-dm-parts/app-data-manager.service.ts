import {
  CommandQueueDataManager,
  CommandQueueUpdateViewModelFunctionFactory,
  CommandQueueViewModelReader,
  QueueFactory
} from "@jcachay/command-queue";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class AppDataManagerService
  extends CommandQueueDataManager
{
constructor(
  reader : CommandQueueViewModelReader,
  queueFactory : QueueFactory,
  updateViewModelFunctionFactory : CommandQueueUpdateViewModelFunctionFactory
) {
  super(reader, queueFactory, updateViewModelFunctionFactory);
}
}
