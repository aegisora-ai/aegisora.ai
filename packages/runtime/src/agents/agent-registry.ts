import { Agent } from "../agent/core/agent";

export type AgentStatus =
  | "idle"
  | "running"
  | "completed"
  | "failed"
  | "stopped";

export interface RegisteredAgent {
  readonly id: string;
  readonly name: string;
  readonly agent: Agent;
  readonly createdAt: Date;
  readonly status: AgentStatus;
  readonly updatedAt: Date;
}

export class AgentRegistry {

  private agents: RegisteredAgent[] = [];

  register(
    agent: Agent
  ) {

    if (!agent.id || agent.id.trim().length === 0) {
      throw new Error(
        "Cannot register agent with empty identity.",
      );
    }

    const existing = this.agents.find(
      entry => entry.id === agent.id,
    );

    if (existing) {
      throw new Error(
        `Agent identity already registered: ${agent.id}`,
      );
    }

    const entry = {
      id: agent.id,
      name: agent.name,
      agent,
      createdAt: new Date(),

      get status(): AgentStatus {
        return agent.getState().status;
      },

      updatedAt: new Date(),
    } as RegisteredAgent;

    this.agents.push(entry);
  }

  updateStatus(
    id: string,
    status: AgentStatus
  ) {

    const entry =
      this.agents.find(
        agent => agent.id === id
      );

    if (!entry) {
      return;
    }

    switch (status) {

      case "running":
        entry.agent.start();
        break;

      case "completed":
        entry.agent.complete();
        break;

      case "failed":
        entry.agent.fail();
        break;

      case "stopped":
        entry.agent.stop();
        break;

      case "idle":
        break;
    }

    (entry as { updatedAt: Date }).updatedAt =
      new Date();
  }

  getAll() {
    return [
      ...this.agents
    ];
  }

  getById(
    id: string
  ) {
    return this.agents.find(
      agent => agent.id === id
    );
  }

  getAgent(
    id: string
  ): Agent | undefined {
    return this.getById(id)?.agent;
  }

  remove(
    id: string
  ) {

    this.agents =
      this.agents.filter(
        agent => agent.id !== id
      );
  }
}

