import {
  AgentRegistry
} from "../agents";

import {
  AgentNode
} from "./agent-node";

export class AgentNetwork {

  private nodes: Map<string, AgentNode>;

  constructor(
    private readonly registry: AgentRegistry
  ) {
    this.nodes = new Map();
  }

  connect(agentId: string) {

    const registered =
      this.registry.getById(agentId);

    if (!registered) {
      throw new Error(
        `Cannot connect unregistered agent: ${agentId}`
      );
    }

    const node: AgentNode = {
      agentId: registered.id,
      status: "online",
      connectedAt: new Date()
    };

    this.nodes.set(
      registered.id,
      node
    );

    return node;
  }

  disconnect(agentId: string) {
    return this.nodes.delete(agentId);
  }

  get(agentId: string) {

    const registered =
      this.registry.getById(agentId);

    if (!registered) {
      throw new Error(
        `Unknown or unregistered agent: ${agentId}`
      );
    }

    const node =
      this.nodes.get(agentId);

    if (!node) {
      throw new Error(
        `Agent not connected: ${agentId}`
      );
    }

    return node;
  }

  list() {
    return Array.from(
      this.nodes.values()
    );
  }

  setStatus(
    agentId: string,
    status:
      | "online"
      | "busy"
      | "offline"
  ) {

    const node =
      this.get(agentId);

    node.status = status;

    return node;
  }
}
