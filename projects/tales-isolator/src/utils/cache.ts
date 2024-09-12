// src/decorators/Cache.ts
import 'reflect-metadata';
import AbcServiceContainer from '../di/AbcServiceContainer';

export function Cache() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const className = Reflect.getMetadata('design:type', target, propertyKey)?.name || 'UnknownClass';
    const methodName = propertyKey;
    const cache = new Map<string, any>();
    
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const service = AbcServiceContainer.resolve(className);
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        console.log(`[${className}] Cache hit for ${methodName}`);
        return cache.get(key);
      }
      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      console.log(`[${className}] Cache miss for ${methodName}`);
      return result;
    };
  };
}
