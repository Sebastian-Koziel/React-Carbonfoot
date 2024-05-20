// src/utils/eventBus.ts
class EventBus extends EventTarget {
    emit(eventName: string, detail: any = {}) {
      this.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
  
    on(eventName: string, callback: (event: Event) => void) {
      this.addEventListener(eventName, callback);
    }
  
    off(eventName: string, callback: (event: Event) => void) {
      this.removeEventListener(eventName, callback);
    }
  }
  
  export const eventBus = new EventBus();
  