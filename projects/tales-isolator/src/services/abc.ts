import AbcServiceContainer from '../di/AbcServiceContainer';
import { Log } from '../decorators/Log';
import { Cache } from '../decorators/Cache';

export class AbcService {
  @Log()
  @Cache()
  public doSomething(param: string): string {
    return `Processed ${param}`;
  }
}

// Register the service with AbcServiceContainer
AbcServiceContainer.register('AbcService', new AbcService());