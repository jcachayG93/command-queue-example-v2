import {ServerDataService} from "../mock-data-access/server-data-service";
import {ViewModelReader} from "./view-model-reader.service";
import {QueueFactory} from "@jcachay/command-queue";
import {PetsDataService} from "./pets-data.service";
import {UpdateViewModelFunctionFactory} from "./update-view-model-function-factory.service";
import {AppDataManagerService} from "./app-data-manager.service";

const factory = (ds:ServerDataService)=>{
  const reader = new ViewModelReader(ds);
  const dataService = new PetsDataService(ds);
  const queueFactory = new QueueFactory(dataService);
  const updateVmFunctionFactory =
    new UpdateViewModelFunctionFactory();

  return new AppDataManagerService(
    reader, queueFactory, updateVmFunctionFactory
  );
}

export const AppDataManagerProvider = {
  provide : AppDataManagerService,
  useFactory: factory,
  deps:[ServerDataService]
};
