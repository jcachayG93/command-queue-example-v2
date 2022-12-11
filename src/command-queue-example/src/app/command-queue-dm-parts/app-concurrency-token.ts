import {ConcurrencyToken} from "@jcachay/command-queue";

export class AppConcurrencyToken
  extends ConcurrencyToken
{

  constructor(version: number) {
    super();
    this.version = version;
  }

  version:number;
}
