export type ExecutionActorType =
  | "agent"
  | "human"
  | "system";

export type ExecutionTargetType =
  | "tool"
  | "provider"
  | "api"
  | "database"
  | "filesystem"
  | "integration";

export interface ExecutionActor {
  type: ExecutionActorType;
  id: string;
}

export interface ExecutionTarget {
  type: ExecutionTargetType;
  name: string;
}

export interface ExecutionIntent {
  id: string;

  agentId: string;

  actor: ExecutionActor;

  target: ExecutionTarget;

  action: string;

  input: unknown;

  metadata: Record<string, unknown>;

  createdAt: Date;
}

export function createExecutionIntent(
  input: Omit<ExecutionIntent, "id" | "createdAt">
): ExecutionIntent {
  return {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };
}
