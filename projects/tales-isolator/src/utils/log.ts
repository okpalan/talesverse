// src/decorators/Log.ts
import 'reflect-metadata';
import AbcServiceContainer from '../di/AbcServiceContainer';

export function Log() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const className = Reflect.getMetadata('design:type', target, propertyKey)?.name || 'UnknownClass';
    const methodName = propertyKey;
    
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const service = AbcServiceContainer.resolve(className);
      console.log(`[${className}] Calling ${methodName} with args: ${JSON.stringify(args)} using service: ${service}`);
      const result = originalMethod.apply(this, args);
      console.log(`[${className}] ${methodName} returned: ${result}`);
      return result;
    };
  };
}
