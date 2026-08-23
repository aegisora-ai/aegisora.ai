import type { RuntimeEvent } from "../events/runtime-event";

import type { SecurityEvent } from "../events/security-event";

import type { PolicyEvent } from "../events/policy-event";

export type ObservabilityEvent = RuntimeEvent | SecurityEvent | PolicyEvent;

export class EventLogger {
  private events: ObservabilityEvent[] = [];

  log(event: ObservabilityEvent): void {
    this.events.push(event);
  }

  getEvents(): ObservabilityEvent[] {
    return [...this.events];
  }

  clear(): void {
    this.events = [];
  }
}
