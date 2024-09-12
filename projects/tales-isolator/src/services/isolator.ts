export interface ComponentIsolator {
    isolateComponent(component: HTMLElement, props: any): HTMLElement;
    updateState(newState: any): void;
    loadComponent(componentUrl: string): Promise<void>;
  }
  