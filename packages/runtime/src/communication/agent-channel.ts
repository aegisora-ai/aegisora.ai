import {
  MessageBus,
  MessageHandler,
} from "./message-bus";

export class AgentChannel {
  constructor(
    private readonly bus: MessageBus,
    private readonly agentId: string,
  ) {}

  /**
   * Receive messages
   */
  onMessage(handler: MessageHandler): void {
    this.bus.subscribe(this.agentId, handler);
  }

  /**
   * Send message
   */
  send(target: string, content: unknown): Promise<void> {
    return this.bus.send({
      id: crypto.randomUUID(),
      from: this.agentId,
      to: target,
      content,
      createdAt: new Date(),
    });
  }
}
