// src/di/DIContainer.ts
class DIContainer {
    private static services: Map<string, any> = new Map();
  
    public static register<T>(name: string, service: T): void {
      this.services.set(name, service);
    }
  
    public static resolve<T>(name: string): T {
      const service = this.services.get(name);
      if (!service) {
        throw new Error(`Service ${name} not found.`);
      }
      return service;
    }
  }
  
  export default DIContainer;
  