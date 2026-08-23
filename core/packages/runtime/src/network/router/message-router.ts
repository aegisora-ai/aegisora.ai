import {
  RoutedMessage
} from "./routed-message";

import {
  AgentNetwork
} from "../agent-network";

export class MessageRouter {

  constructor(
    private readonly network: AgentNetwork
  ) {}

  route(
    message: RoutedMessage
  ) {

    const target =
      this.network.get(
        message.to
      );

    if (target.status === "offline") {
      throw new Error(
        `Agent offline: ${message.to}`
      );
    }

    return {
      delivered: true,
      agent: target.agentId,
      messageId: message.id
    };
  }

  broadcast(
    message: RoutedMessage
  ) {

    return this.network
      .list()
      .map(agent => ({
        agent: agent.agentId,
        messageId: message.id
      }));
  }

}
