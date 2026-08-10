import type {
  ExecutionIntent,
} from "./execution-intent";

export interface GovernanceContext {
  intent: ExecutionIntent;

  requestId: string;

  startedAt: Date;

  metadata: Record<string, unknown>;
}
