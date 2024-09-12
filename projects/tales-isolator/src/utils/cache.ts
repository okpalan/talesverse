import DIContainer from "./dependency_injector";

export function Cache(serviceName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      const cache = new Map<string, any>();
  
      descriptor.value = function (...args: any[]) {
        const service = DIContainer.resolve(serviceName);
        const key = JSON.stringify(args);
        if (cache.has(key)) {
          console.log(`Cache hit for service: ${serviceName}`);
          return cache.get(key);
        }
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        console.log(`Cache miss for service: ${serviceName}`);
        return result;
      };
    };
  }