import DIContainer from "./dependency_injector";

export function Log(serviceName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const service = DIContainer.resolve(serviceName);
      console.log(`Calling ${propertyKey} with args: ${JSON.stringify(args)} using service: ${serviceName}`);
      const result = originalMethod.apply(this, args);
      console.log(`${propertyKey} returned: ${result}`);
      return result;
    };
  };
}

