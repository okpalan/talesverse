import { Log } from "../utils/log";
import { ComponentIsolator } from "./isolator";

export class DefaultIsolator implements ComponentIsolator {
  private cache = new Map<string, HTMLElement>();

  @Log('isolatorService')
  public isolateComponent(component: HTMLElement, props: any): HTMLElement {
    const key = JSON.stringify(props);
    if (this.cache.has(key)) {
      return this.cache.get(key) as HTMLElement;
    }

    const componentClone = component.cloneNode(true) as HTMLElement;
    Object.assign(componentClone, props);
    this.cache.set(key, componentClone);

    return componentClone;
  }

  @Log('isolatorService')
  public updateState(newState: any): void {
    console.log('State updated to:', newState);
  }

  @Log('isolatorService')
  public async loadComponent(componentUrl: string): Promise<void> {
    console.log('Loading component from URL:', componentUrl);
  }
}
