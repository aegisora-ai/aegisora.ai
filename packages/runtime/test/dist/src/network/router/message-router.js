"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRouter = void 0;
class MessageRouter {
    network;
    constructor(network) {
        this.network = network;
    }
    route(message) {
        const target = this.network.get(message.to);
        if (target.status === "offline") {
            throw new Error(`Agent offline: ${message.to}`);
        }
        return {
            delivered: true,
            agent: target.profile.id,
            messageId: message.id
        };
    }
    broadcast(message) {
        return this.network
            .list()
            .map(agent => ({
            agent: agent.profile.id,
            messageId: message.id
        }));
    }
}
exports.MessageRouter = MessageRouter;
