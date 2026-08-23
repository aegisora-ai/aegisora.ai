/**
 * Aegisora Runtime Observability Service
 *
 * Bridges runtime execution events
 * with the observability package.
 */

import type {
  RuntimeEvent,
  SecurityEvent,
  PolicyEvent,
} from "@aegisora/observability";

export class ObservabilityService {
  private events: Array<RuntimeEvent | SecurityEvent | PolicyEvent> = [];

  /**
   * Record runtime event
   */
  recordRuntimeEvent(event: RuntimeEvent): void {
    this.events.push(event);
  }

  /**
   * Record security event
   */
  recordSecurityEvent(event: SecurityEvent): void {
    this.events.push(event);
  }

  /**
   * Record policy evaluation event
   */
  recordPolicyEvent(event: PolicyEvent): void {
    this.events.push(event);
  }

  /**
   * Get collected events
   */
  getEvents(): Array<RuntimeEvent | SecurityEvent | PolicyEvent> {
    return [...this.events];
  }

  /**
   * Clear events
   */
  clear(): void {
    this.events = [];
  }
}
