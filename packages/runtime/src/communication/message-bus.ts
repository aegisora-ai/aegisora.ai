import {
  AgentRegistry
} from "../agents";

import {
  AgentMessage,
  MessageHandler,
} from "./message";

export class MessageBus {

  private handlers:
    Map<string, MessageHandler[]>;

  constructor(
    private readonly registry: AgentRegistry
  ) {
    this.handlers = new Map();
  }

  /**
   * Subscribe agent.
   *
   * Communication identity MUST originate
   * from the canonical Runtime AgentRegistry.
   */
  subscribe(
    agentId: string,
    handler: MessageHandler,
  ): void {

    const registered =
      this.registry.getById(agentId);

    if (!registered) {
      throw new Error(
        `Cannot subscribe unregistered agent: ${agentId}`
      );
    }

    const existing =
      this.handlers.get(agentId) ?? [];

    existing.push(handler);

    this.handlers.set(
      agentId,
      existing,
    );
  }

  /**
   * Send message.
   *
   * Both sender and recipient MUST be
   * canonical registered runtime identities.
   */
  async send(
    message: AgentMessage,
  ): Promise<void> {

    const sender =
      this.registry.getById(message.from);

    if (!sender) {
      throw new Error(
        `Unknown or unregistered sender identity: ${message.from}`
      );
    }

    const recipient =
      this.registry.getById(message.to);

    if (!recipient) {
      throw new Error(
        `Unknown or unregistered recipient identity: ${message.to}`
      );
    }

    const handlers =
      this.handlers.get(message.to) ?? [];

    for (const handler of handlers) {
      await handler(message);
    }
  }

  /**
   * Connected / subscribed agents.
   */
  agents(): string[] {
    return Array.from(
      this.handlers.keys(),
    );
  }
}

export type {
  MessageHandler,
} from "./message";
