
export type RuntimeEventType =
  | "agent.created"
  | "agent.started"
  | "plan.created"
  | "step.started"
  | "tool.called"
  | "tool.completed"
  | "step.completed"
  | "agent.completed"
  | "agent.failed";


export interface RuntimeEvent {

id:string;

type:RuntimeEventType;

agentId:string;

timestamp:Date;

payload?:unknown;

}
