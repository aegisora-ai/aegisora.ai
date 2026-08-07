"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observer = void 0;
class Observer {
    observe(context) {
        return {
            id: crypto.randomUUID(),
            source: "runtime",
            data: {
                agentId: context.agentId,
                goal: context.goal,
                environment: "unknown"
            },
            timestamp: new Date()
        };
    }
}
exports.Observer = Observer;
