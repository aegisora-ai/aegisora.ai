export interface AgentNode {

  readonly agentId: string;

  status:
    | "online"
    | "busy"
    | "offline";

  connectedAt: Date;
}
