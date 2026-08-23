/**
 * Runtime execution events
 */

export type RuntimeEventType =
  | "REQUEST_RECEIVED"
  | "REQUEST_VALIDATED"
  | "EXECUTION_STARTED"
  | "EXECUTION_COMPLETED"
  | "EXECUTION_FAILED";

export interface RuntimeEvent {
  id: string;

  type: RuntimeEventType;

  requestId: string;

  agentId: string;

  timestamp: Date;

  metadata?: Record<string, unknown>;
}
