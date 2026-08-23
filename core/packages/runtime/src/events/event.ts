
export type RuntimeEventType =
  | "agent.created"
  | "agent.started"
  | "plan.created"
  | "step.started"
  | "tool.called"
  | "provider.called"
  | "agent.called"
  | "tool.completed"
  | "step.completed"
  | "agent.completed"
  | "agent.failed"
| "agent.stopped";


export interface RuntimeEvent {

id:string;

type:RuntimeEventType;

agentId:string;

timestamp: Date;

metadata?: Record<string, unknown>;

payload?: unknown;

}
